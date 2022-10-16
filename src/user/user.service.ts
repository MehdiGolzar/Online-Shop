import { ConflictException, Injectable } from '@nestjs/common';
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
      throw new ConflictException({ message: 'Username already exists' });
    }

    const isExistsEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isExistsEmail) {
      throw new ConflictException({ message: 'Email already exists' });
    }

    const isExistsPhoneNumber = await this.userRepository.findOne({
      where: { phone_number: createUserDto.phone_number },
    });

    if (isExistsPhoneNumber) {
      throw new ConflictException({ message: 'Phone number already exists' });
    }

    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
