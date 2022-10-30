import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInUnauthorized, SignUpConflicit } from './auth.exceptions';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { SignUpErrors } from './enums/auth-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async signIn(signInDto: SignInDto): Promise<User> {
    const { username, password } = signInDto;

    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    const isValidPassword = await foundUser.compare(password);

    if (foundUser && !isValidPassword) {
      // send token   
    } else {
      throw new SignInUnauthorized();
    }

    return foundUser;
  }
}
