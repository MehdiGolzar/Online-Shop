import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.respository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUserById(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.removeUserById(id);
  }
}
