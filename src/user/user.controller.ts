import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SuccessResponse } from 'src/shared/dto/response/response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { SharedMessage } from 'src/shared/enum/shared-message.enum';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserResponseType } from './dto/response/user-response.dto';
import { User } from './entities/user.entity';

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
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    await this.userService.create(createUserDto);

    return new SuccessResponse(
      null,
      SharedMessage.SUCCESS_RESPONSE,
      HttpStatus.CREATED,
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponse<UserDto>> {
    const targetUser = await this.userService.findOne(id);

    return new SuccessResponse(
      new UserDto(targetUser),
      SharedMessage.SUCCESS_RESPONSE,
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);

    return new SuccessResponse(
      updatedUser,
      SharedMessage.SUCCESS_RESPONSE,
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);

    return new SuccessResponse(
      null,
      SharedMessage.SUCCESS_RESPONSE,
      HttpStatus.OK,
    );
  }
}
