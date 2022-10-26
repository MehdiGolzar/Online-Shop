import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { User } from '../entities/user.entity';
import { UserErrors } from '../enums/user-messages.enum';
import { UserConflicit } from '../user.exceptions';

@Injectable()
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { first_name, last_name, username, password, email, phone_number } =
      createUserDto;

    const foundUser = await this.findOne({
      where: [{ username }, { email }, { phone_number }],
    });

    if (foundUser) {
      if (foundUser.username === username) {
        throw new UserConflicit(UserErrors.USERNAEM_CONFLICT);
      }

      if (foundUser.email === email) {
        throw new UserConflicit(UserErrors.EMAIL_CONFLICT);
      }

      if (foundUser.phone_number === phone_number) {
        throw new UserConflicit(UserErrors.PHONE_NUMBER_CONFLICT);
      }
    }

    const newUser = this.create({
      first_name,
      last_name,
      username,
      password,
      email,
      phone_number,
    });

    const aaa = await this.save(newUser);
    return aaa;
  }
}
