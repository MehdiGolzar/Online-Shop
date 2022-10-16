import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/dto/response/response.dto';
import { UserDto } from './user.dto';

export class UserResponseType extends SuccessResponse<UserDto> {
  @ApiProperty({ type: UserDto })
  public data: UserDto;
}
