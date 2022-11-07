import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigConstant } from 'src/config/config.const';

@Injectable()
export class RedisProxy {
  constructor(private redisService: RedisService) {}

  saveVerifyCode(phoneNumber: string, verifyCode: number) {
    const client = this.redisService.getClient();
    return client.set(
      `${phoneNumber}-verify-code:`,
      verifyCode,
      'EX',
      ConfigConstant.smsPanel.otp.expireTime,
    );
  }

  readVerifyCode(phoneNumber: string) {
    const client = this.redisService.getClient();
    return client.get(`${phoneNumber}-verify-code:`);
  }
}
