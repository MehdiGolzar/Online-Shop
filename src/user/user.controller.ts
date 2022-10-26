import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SuccessResponse } from 'src/shared/dto/response/response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { SharedMessage } from 'src/shared/enum/shared-message.enum';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserResponseType } from './dto/response/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: SharedMessage.SUCCESS_RESPONSE,
    type: UserResponseType,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);

    // return new SuccessResponse(
    //   new UserDto(createdUser),
    //   SharedMessage.SUCCESS_RESPONSE,
    //   201,
    // );
    return 'ok'
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const targetUser = await this.userService.findOne(id);

    return new SuccessResponse(
      new UserDto(targetUser),
      SharedMessage.SUCCESS_RESPONSE,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
