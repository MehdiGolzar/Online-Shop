import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/dto/response/base-response.dto';
export class UserDto extends BaseResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone_number: string;

  constructor(initial: Partial<UserDto>) {
    super(initial);
    this.id = initial.id;
    this.username = initial.username;
    this.first_name = initial.first_name;
    this.last_name = initial.last_name;
    this.email = initial.email;
    this.phone_number = initial.phone_number;
  }
}
