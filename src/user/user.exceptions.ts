import { ConflictException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from 'src/shared/dto/response/response.dto';
import { UserErrors } from './enums/user-messages.enum';

export class UserConflicit extends ConflictException {
  constructor(message) {
    super(new ErrorResponse(message, HttpStatus.CONFLICT));
  }
}
