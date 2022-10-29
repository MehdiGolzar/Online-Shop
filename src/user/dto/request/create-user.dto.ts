import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name: string;

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

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
