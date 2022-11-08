import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OtpVerifyDto {
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  verifyCode: string;
}
