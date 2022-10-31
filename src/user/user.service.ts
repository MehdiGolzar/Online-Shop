import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';
import { UserErrors } from './enums/user-messages.enum';
import { UserConflicit, UserNotFound } from './user.exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {}

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: string): Promise<User> {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new UserNotFound();
    }

    return userFound;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action update user`;
  }

  remove(id: string) {
    return `This action remove user`;
  }
}
