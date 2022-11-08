import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class LoginWithPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  @IsOptional()
  username?: string;

  @IsPhoneNumber('IR')
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
