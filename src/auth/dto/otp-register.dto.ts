import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class OtpRegisterDto {
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phoneNumber: string;
}
