import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ErrorResponse } from 'src/shared/dto/response/response.dto';
import { UserErrors } from './enums/user-messages.enum';

export class UserConflicit extends ConflictException {
  constructor(message) {
    super(new ErrorResponse(message, HttpStatus.CONFLICT));
  }
}

export class UserNotFound extends NotFoundException {
  constructor() {
    super(new ErrorResponse(UserErrors.NOT_FOUND, HttpStatus.NOT_FOUND));
  }
}
