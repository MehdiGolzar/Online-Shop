import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpRegisterDto } from './dto/otp-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/otp')
  otpRegister(@Body() otpRegisterDto: OtpRegisterDto): Promise<void> {
    return this.authService.otpRegister(otpRegisterDto);
  }

  @Post('login')
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto);
  }
}
