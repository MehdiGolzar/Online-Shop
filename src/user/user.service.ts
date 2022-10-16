import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExistsUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (isExistsUsername) {
      throw new ConflictException({
        message: 'Username already exists',
        status: 409,
      });
    }

    const isExistsEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isExistsEmail) {
      throw new ConflictException({
        message: 'Email already exists',
        status: 409,
      });
    }

    const isExistsPhoneNumber = await this.userRepository.findOne({
      where: { phone_number: createUserDto.phone_number },
    });

    if (isExistsPhoneNumber) {
      throw new ConflictException({
        message: 'Phone number already exists',
        status: 409,
      });
    }

    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const targetUser = await this.userRepository.findOne({ where: { id } });

    if (!targetUser) {
      throw new NotFoundException({ message: 'User not found', status: 404 });
    }

    return targetUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
