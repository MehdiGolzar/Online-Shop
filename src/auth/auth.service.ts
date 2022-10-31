import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpConflicit, Unauthorized } from './auth.exceptions';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthErrors, SignUpErrors } from './enums/auth-messages.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async isUserDuplicate(
    username: string,
    email: string,
    phoneNumber: string,
  ) {
    const isDuplicated = await this.userRepository.findOne({
      where: [{ username }, { email }, { phoneNumber }],
    });

    if (isDuplicated) {
      if (isDuplicated.username === username) {
        throw new SignUpConflicit(SignUpErrors.USERNAEM_CONFLICT);
      }
      if (isDuplicated.email === email) {
        throw new SignUpConflicit(SignUpErrors.EMAIL_CONFLICT);
      }
      if (isDuplicated.phoneNumber === phoneNumber) {
        throw new SignUpConflicit(SignUpErrors.phoneNumber_CONFLICT);
      }
    } else {
      return false;
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email, phoneNumber } = signUpDto;

    await this.isUserDuplicate(username, email, phoneNumber);

    const newUser = this.userRepository.create(signUpDto);
    await this.userRepository.save(newUser);

    return;
  }

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
