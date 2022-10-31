import {
  ConflictException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorResponse } from 'src/shared/dto/response/response.dto';
import { AuthErrors } from './enums/auth-messages.enum';

export class SignUpConflicit extends ConflictException {
  constructor(message: string) {
    super(new ErrorResponse(message, HttpStatus.CONFLICT));
  }
}

export class Unauthorized extends UnauthorizedException {
  constructor(message: string = AuthErrors.UNAUTHORIZED) {
    super(new ErrorResponse(message, HttpStatus.UNAUTHORIZED));
  }
}
