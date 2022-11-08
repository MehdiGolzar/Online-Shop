import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompleteRegistrationDto } from './dto/complete-registration.dto';
import { LoginWithPasswordDto } from './dto/login-with-password.dto';
import { OtpRegisterDto } from './dto/otp-register.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { JwtToken } from './interfaces/jwt-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/otp')
  @HttpCode(200)
  otpRegister(@Body() otpRegisterDto: OtpRegisterDto): Promise<void> {
    return this.authService.otpRegister(otpRegisterDto);
  }

  @Post('signup/otp/verify')
  @HttpCode(200)
  otpVerify(@Body() otpVerifyDto: OtpVerifyDto): Promise<void> {
    return this.authService.otpVerify(otpVerifyDto);
  }

  @Post('signup/otp/complete')
  completeRegistration(
    @Body() completeRegistrationDto: CompleteRegistrationDto,
  ): Promise<void> {
    return this.authService.completeRegistration(completeRegistrationDto);
  }

  @Post('login/password')
  @HttpCode(200)
  login(@Body() loginWithPasswordDto: LoginWithPasswordDto): Promise<JwtToken> {
    return this.authService.loginWithPassword(loginWithPasswordDto);
  }

  @Post('login/phoneNumber')
  @HttpCode(200)
  loginWithPhoneNumber(@Body() otpRegisterDto: OtpRegisterDto): Promise<void> {
    return this.authService.loginWithPhoneNumber(otpRegisterDto);
  }

  @Post('login/phoneNumber/verify')
  @HttpCode(200)
  verifyLoginWithPhoneNumber(
    @Body() otpVerifyDto: OtpVerifyDto,
  ): Promise<JwtToken> {
    return this.authService.verifyLoginWithPhoneNumber(otpVerifyDto);
  }
}
