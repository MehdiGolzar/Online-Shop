import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Boolean })
  isDeleted: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  constructor(initial?: Partial<BaseResponse>) {
    this.id = initial.id;
    this.isDeleted = initial.isDeleted;
    this.createdAt = initial.createdAt;
    this.updatedAt = initial.updatedAt;
    this.deletedAt = initial.deletedAt;
  }
}
