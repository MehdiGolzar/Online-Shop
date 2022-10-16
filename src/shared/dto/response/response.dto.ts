import { ApiProperty } from '@nestjs/swagger';

export class MetaDataDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  nextPage: number;

  @ApiProperty({ type: Number })
  totalPage: number;
}

export class BaseSuccessResponse<type> {
  @ApiProperty({ type: MetaDataDto, required: false })
  metadata?: MetaDataDto;

  @ApiProperty({ type: Object })
  data: type;

  @ApiProperty({ type: String, required: false })
  message?: string;

  @ApiProperty({ type: String })
  statusCode: string;
}

export class SuccessResponse<type> extends BaseSuccessResponse<type> {
  constructor(data: type, message?: string, statusCode: number = 200) {
    super();

    this.data = data;
    this.message = message;
    this.statusCode = String(statusCode);
  }
}

export class SuccessPaginationResponse<type> extends BaseSuccessResponse<type> {
  constructor(
    data: type,
    limit: number,
    page: number,
    total: number,
    message?: string,
  ) {
    super();

    this.data = data;
    this.metadata = {
      total,
      nextPage: Math.ceil(total / limit) === page ? page : page + 1,
      totalPage: Math.ceil(total / limit),
    };
    this.message = message;
    this.statusCode = '200';
  }
}

export class BaseErrorResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  statusCode: string;
}

export class ErrorResponse extends BaseErrorResponse {
  constructor(message: string, statusCode: number) {
    super();

    this.message = message;
    this.statusCode = String(statusCode);
  }
}
