import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { User } from '../entities/user.entity';
import { UserErrors } from '../enums/user-messages.enum';
import { UserConflicit, UserNotFound } from '../user.exceptions';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  private async createConflictChecker(createUserDto: CreateUserDto) {
    const { username, email, phone_number } = createUserDto;

    const existsUser = await this.findOne({
      where: [{ username }, { email }, { phone_number }],
    });

    if (existsUser) {
      if (existsUser.username === createUserDto.username) {
        throw new UserConflicit(UserErrors.USERNAEM_CONFLICT);
      }
      if (existsUser.email === createUserDto.email) {
        throw new UserConflicit(UserErrors.EMAIL_CONFLICT);
      }
      if (existsUser.phone_number === createUserDto.phone_number) {
        throw new UserConflicit(UserErrors.PHONE_NUMBER_CONFLICT);
      }
    } else {
      return;
    }
  }

  private async updateConflictChecker(
    userId: string,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findUserById(userId);

    const { username, email, phone_number } = updateUserDto;

    const existsUser = await this.findOne({
      where: [{ username }, { email }, { phone_number }],
    });

    if (existsUser) {
      if (
        existsUser.username === updateUserDto.username &&
        existsUser.id !== userId
      ) {
        throw new UserConflicit(UserErrors.USERNAEM_CONFLICT);
      }
      if (
        existsUser.email === updateUserDto.email &&
        existsUser.id !== userId
      ) {
        throw new UserConflicit(UserErrors.EMAIL_CONFLICT);
      }
      if (
        existsUser.phone_number === updateUserDto.phone_number &&
        existsUser.id !== userId
      ) {
        throw new UserConflicit(UserErrors.PHONE_NUMBER_CONFLICT);
      }
    } else {
      return;
    }
  }

  private duplicateFieldPicker(error) {
    const field = error.detail.slice(
      error.detail.indexOf('(') + 1,
      error.detail.indexOf(')'),
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.create(createUserDto);
      await this.save(newUser);
      return;
    } catch (error) {
      if (error.code === '23505') {
        return this.duplicateFieldPicker(error);
      }
    }
  }

  async findUserById(userId: string): Promise<User> {
    const foundUser = await this.findOne({ where: { id: userId } });

    if (!foundUser) {
      throw new UserNotFound();
    }

    return foundUser;
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    try {
      
      const result = await this.update(userId, updateUserDto);
    } catch (error) {
      
    }


    // if (result.affected === 0) {
    //   throw new UserNotFound();
    // }

    return;
  }

  async removeUserById(userId: string): Promise<void> {
    const result = await this.delete(userId);

    if (result.affected === 0) {
      throw new UserNotFound();
    }

    return;
  }
}
