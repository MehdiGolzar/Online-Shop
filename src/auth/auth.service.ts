import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  BadRequest,
  Conflicit,
  Forbidden,
  Unauthorized,
} from './auth.exceptions';
import { LoginWithPasswordDto } from './dto/login-with-password.dto';
import { AuthErrors, RegisterErrors } from './enums/auth-messages.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import * as Kavenegar from 'kavenegar';
import { OtpRegisterDto } from './dto/otp-register.dto';
import { ConfigConstant } from 'src/config/config.const';
import { RedisProxy } from 'src/shared/proxies/redis.proxy';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { CompleteRegistrationDto } from './dto/complete-registration.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private redisProxi: RedisProxy,
  ) {}

  private async phoneNumberConflictChecker(phoneNumber: string): Promise<void> {
    const isExistPhoneNumber = await this.userRepository.findOne({
      where: { phoneNumber },
    });

    if (isExistPhoneNumber) {
      throw new Conflicit(RegisterErrors.PHONE_NUMBER_CONFLICT);
    }

    return;
  }

  private async verifyCodeGenerator(): Promise<number> {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private async verifyCodeSender(phoneNumber: string, verifyCode: number) {
    const kavenegarApi = Kavenegar.KavenegarApi({
      apikey: ConfigConstant.smsPanel.apiKey,
    });

    return kavenegarApi.VerifyLookup(
      {
        receptor: phoneNumber,
        token: verifyCode,
        template: ConfigConstant.smsPanel.otp.pattern,
      },
      function (response, status) {
        console.log({ response, status });

        return { response, status };
      },
    );
  }

  private async usernameConflictChecker(username: string): Promise<void> {
    const isExistUsername = await this.userRepository.findOne({
      where: { username },
    });

    if (isExistUsername) {
      throw new Conflicit(RegisterErrors.USERNAEM_CONFLICT);
    }

    return;
  }

  private async emailConflictChecker(email: string): Promise<void> {
    const isExistEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (isExistEmail) {
      throw new Conflicit(RegisterErrors.USERNAEM_CONFLICT);
    }

    return;
  }

  async otpRegister(otpRegisterDto: OtpRegisterDto): Promise<void> {
    const { phoneNumber } = otpRegisterDto;

    await this.phoneNumberConflictChecker(phoneNumber);

    const verifyCode = await this.verifyCodeGenerator();

    await this.redisProxi.saveVerifyCode(phoneNumber, verifyCode);

    await this.verifyCodeSender(phoneNumber, verifyCode);

    return;
  }

  async otpVerify(otpVerifyDto: OtpVerifyDto): Promise<void> {
    const { phoneNumber, verifyCode } = otpVerifyDto;

    const storedVerifyCode = await this.redisProxi.readVerifyCode(phoneNumber);

    if (!storedVerifyCode) {
      throw new BadRequest(RegisterErrors.VERIFICATION_FAILED);
    }

    if (verifyCode !== storedVerifyCode) {
      throw new BadRequest(RegisterErrors.VERIFICATION_FAILED);
    }

    await this.redisProxi.saveTemporaryUser(phoneNumber);

    return;
  }

  async completeRegistration(
    completeRegistrationDto: CompleteRegistrationDto,
  ): Promise<void> {
    const { phoneNumber, username, email } = completeRegistrationDto;

    const isVerifiedUser = await this.redisProxi.readTemporaryUser(phoneNumber);

    if (!Boolean(isVerifiedUser)) {
      throw new Forbidden(RegisterErrors.TEMPORARY_USER_NOT_EXISTS);
    }

    await this.redisProxi.deleteVerifyCode(phoneNumber);

    await this.usernameConflictChecker(username);

    if (!!email) {
      await this.emailConflictChecker(email);
    }

    const newUser = this.userRepository.create(completeRegistrationDto);

    await this.userRepository.save(newUser);

    await this.redisProxi.deleteTemporaryUser(phoneNumber);

    return;
  }

  async loginWithPassword(
    loginWithPasswordDto: LoginWithPasswordDto,
  ): Promise<JwtToken> {
    const { username, phoneNumber, email, password } = loginWithPasswordDto;

    const userFound = await this.userRepository.findOne({
      where: [{ username }, { phoneNumber }, { email }],
    });

    if (!userFound) {
      throw new Unauthorized(AuthErrors.LOGIN_FAIL);
    }

    const isValidPassword = await userFound.compare(password);

    if (!isValidPassword) {
      throw new Unauthorized(AuthErrors.LOGIN_FAIL);
    }

    const payload: JwtPayload = { id: userFound.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async loginWithPhoneNumber(otpRegisterDto: OtpRegisterDto): Promise<void> {
    const { phoneNumber } = otpRegisterDto;

    const userFound = await this.userRepository.findOne({
      where: { phoneNumber },
    });

    if (!userFound) {
      throw new Unauthorized(AuthErrors.PHONE_NUMBER_NOT_REGISTERED);
    }

    const verifyCode = await this.verifyCodeGenerator();

    await this.redisProxi.saveVerifyCode(phoneNumber, verifyCode);

    await this.verifyCodeSender(phoneNumber, verifyCode);

    return;
  }

  async verifyLoginWithPhoneNumber(otpVerifyDto: OtpVerifyDto) {
    const { phoneNumber, verifyCode } = otpVerifyDto;

    const userFound = await this.userRepository.findOne({
      where: { phoneNumber },
    });

    if (!userFound) {
      throw new Unauthorized(AuthErrors.PHONE_NUMBER_NOT_REGISTERED);
    }

    const storedVerifyCode = await this.redisProxi.readVerifyCode(phoneNumber);

    if (!storedVerifyCode) {
      throw new BadRequest(RegisterErrors.VERIFICATION_FAILED);
    }

    if (verifyCode !== storedVerifyCode) {
      throw new BadRequest(RegisterErrors.VERIFICATION_FAILED);
    }

    const payload: JwtPayload = { id: userFound.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
