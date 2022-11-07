import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OtpVerifyDto {
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phoneNumber: string;

  @IsInt()
  @MinLength(6)
  @MaxLength(6)
  verifyCode: string;
}
