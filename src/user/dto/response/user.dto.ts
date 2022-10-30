import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/dto/response/base-response.dto';
export class UserDto extends BaseResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phoneNumber: string;

  constructor(initial: Partial<UserDto>) {
    super(initial);
    this.id = initial.id;
    this.firstName = initial.firstName;
    this.lastName = initial.lastName;
    this.username = initial.username;
    this.email = initial.email;
    this.phoneNumber = initial.phoneNumber;
  }
}
