import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phone_number: string;
}
