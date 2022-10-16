import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Boolean })
  isDeleted: boolean;

  @ApiProperty({ type: Number })
  create_at: number;

  @ApiProperty({ type: Number })
  update_at: number;

  constructor(initial?: Partial<BaseResponse>) {
    this.id = initial.id;
    this.isDeleted = initial.isDeleted;
    this.create_at = initial.create_at;
    this.update_at = initial.update_at;
  }
}
