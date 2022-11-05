import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisProxy {
  constructor(private redisService: RedisService) {}

  saveVerifyCode() {
    const client = this.redisService.getClient();
  }
}
