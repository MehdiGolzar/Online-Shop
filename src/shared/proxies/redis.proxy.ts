import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigConstant } from 'src/config/config.const';
import { BadRequest } from 'src/auth/auth.exceptions';
import { RegisterErrors } from 'src/auth/enums/auth-messages.enum';

@Injectable()
export class RedisProxy {
  constructor(private redisService: RedisService) {}

  async saveVerifyCode(
    phoneNumber: string,
    verifyCode: number,
  ): Promise<string> {
    const client = this.redisService.getClient();

    const isExistVerifyCode = await this.readVerifyCode(phoneNumber);

    if (isExistVerifyCode) {
      throw new BadRequest(RegisterErrors.VERIFICATION_CODE_SENT);
    }

    return client.set(
      `${phoneNumber}-verify-code:`,
      verifyCode,
      'EX',
      ConfigConstant.smsPanel.otp.expireTime,
    );
  }

  async readVerifyCode(phoneNumber: string): Promise<string> {
    const client = this.redisService.getClient();
    return client.get(`${phoneNumber}-verify-code:`);
  }

  async deleteVerifyCode(phoneNumber: string) {
    const client = this.redisService.getClient();
    return client.del(`${phoneNumber}-verify-code:`);
  }

  async saveTemporaryUser(phoneNumber: string): Promise<string> {
    const client = this.redisService.getClient();

    return client.set(
      `temporary-${phoneNumber}-user`,
      'true',
      'EX',
      ConfigConstant.temporaryUserExpireTime,
    );
  }

  async readTemporaryUser(phoneNumber: string) {
    const client = this.redisService.getClient();
    return client.get(`temporary-${phoneNumber}-user`);
  }

  async deleteTemporaryUser(phoneNumber: string) {
    const client = this.redisService.getClient();
    return client.del(`temporary-${phoneNumber}-user`);
  }
}
