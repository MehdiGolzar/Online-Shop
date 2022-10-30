import {
  ConflictException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorResponse } from 'src/shared/dto/response/response.dto';
import { SignInErrors } from './enums/auth-messages.enum';

export class SignUpConflicit extends ConflictException {
  constructor(message) {
    super(new ErrorResponse(message, HttpStatus.CONFLICT));
  }
}

export class SignInUnauthorized extends UnauthorizedException {
  constructor() {
    super(
      new ErrorResponse(SignInErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),
    );
  }
}
