import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequest, Conflicit, Unauthorized } from './auth.exceptions';
import { LoginDto } from './dto/login.dto';
import { AuthErrors, RegisterErrors } from './enums/auth-messages.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import * as Kavenegar from 'kavenegar';
import { OtpRegisterDto } from './dto/otp-register.dto';
import { ConfigConstant } from 'src/config/config.const';
import { RedisProxy } from 'src/shared/proxies/redis.proxy';
import { OtpVerifyDto } from './dto/otp-verify.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private redisProxi: RedisProxy,
  ) {}

  // private async isUserDuplicate(
  //   username: string,
  //   email: string,
  //   phoneNumber: string,
  // ) {
  //   const isDuplicated = await this.userRepository.findOne({
  //     where: [{ username }, { email }, { phoneNumber }],
  //   });

  //   if (isDuplicated) {
  //     if (isDuplicated.username === username) {
  //       throw new Conflicit(SignUpErrors.USERNAEM_CONFLICT);
  //     }
  //     if (isDuplicated.email === email) {
  //       throw new Conflicit(SignUpErrors.EMAIL_CONFLICT);
  //     }
  //     if (isDuplicated.phoneNumber === phoneNumber) {
  //       throw new Conflicit(SignUpErrors.phoneNumber_CONFLICT);
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  private async phoneNumberConflictChecker(phoneNumber: string) {
    const isExistPhoneNumber = await this.userRepository.findOne({
      where: { phoneNumber },
    });

    if (isExistPhoneNumber) {
      throw new Conflicit(RegisterErrors.phoneNumber_CONFLICT);
    }

    return false;
  }

  // private async confirmByPhoneNumber(phoneNumber: string) {
  //   const apiKey =
  //     '6D6A5539734B67676C7365506672586D33665257424E3947526C6A706F43772B466A3650686758465972453D';
  //   const api = Kavenegar.KavenegarApi({
  //     apikey: apiKey,
  //   });

  //   return api.VerifyLookup(
  //     {
  //       receptor: '+989129009479',
  //       token: '123456',
  //       template: 'Verify',
  //     },
  //     function (response, status) {
  //       return { response, status };
  //     },
  //   );
  // }

  private async verifyCodeGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async otpRegister(otpRegisterDto: OtpRegisterDto) {
    const { phoneNumber } = otpRegisterDto;

    await this.phoneNumberConflictChecker(phoneNumber);

    const verifyCode = await this.verifyCodeGenerator();

    await this.redisProxi.saveVerifyCode(phoneNumber, verifyCode);

    const kavenegarApi = Kavenegar.kavenegarApiI({
      apikey: ConfigConstant.smsPanel.apiKey,
    });
    kavenegarApi.VerifyLookup(
      {
        receptor: phoneNumber,
        token: verifyCode,
        template: ConfigConstant.smsPanel.otp.pattern,
      },
      function (response, status) {
        return { response, status };
      },
    );
  }

  async otpVerify(otpVerifyDto: OtpVerifyDto) {
    const { phoneNumber, verifyCode } = otpVerifyDto;

    const savedVerifyCode = await this.redisProxi.readVerifyCode(phoneNumber);

    if (verifyCode !== savedVerifyCode) {
      throw new BadRequest(AuthErrors.VERIFICATION_FAILED);
    }

    return 'ok';
  }

  async completeRegistration() {}

  // async signUp(signUpDto: SignUpDto): Promise<void> {
  //   const { username, email, phoneNumber } = signUpDto;

  //   await this.isUserDuplicate(username, email, phoneNumber);
  //   //redis
  //   await this.confirmByPhoneNumber(phoneNumber);
  //   //
  //   // const newUser = this.userRepository.create(signUpDto);
  //   // await this.userRepository.save(newUser);

  //   // return;
  // }

  async login(loginDto: LoginDto): Promise<JwtToken> {
    const { username, password } = loginDto;

    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    const isValidPassword = await userFound.compare(password);

    if (userFound && isValidPassword) {
      const payload: JwtPayload = { id: userFound.id };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new Unauthorized(AuthErrors.LOGIN_FAIL);
    }
  }
}
