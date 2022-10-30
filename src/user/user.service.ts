import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';
import { UserErrors } from './enums/user-messages.enum';
import { UserConflicit } from './user.exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async isUserDuplicated(
    username: string,
    email: string,
    phoneNumber: string,
  ) {
    const isDuplicated = await this.userRepository.findOne({
      where: [{ username }, { email }, { phoneNumber }],
    });

    if (isDuplicated) {
      if (isDuplicated.username === username) {
        throw new UserConflicit(UserErrors.USERNAEM_CONFLICT);
      }
      if (isDuplicated.email === email) {
        throw new UserConflicit(UserErrors.EMAIL_CONFLICT);
      }
      if (isDuplicated.phoneNumber === phoneNumber) {
        throw new UserConflicit(UserErrors.phoneNumber_CONFLICT);
      }
    } else {
      return false;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { firstName, lastName, username, email, phoneNumber, password } =
      createUserDto;

    await this.isUserDuplicated(username, email, phoneNumber);

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action return one user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action update user`;
  }

  remove(id: string) {
    return `This action remove user`;
  }
}
