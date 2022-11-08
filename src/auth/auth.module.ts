import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigConstant } from 'src/config/config.const';
import { RedisProxy } from 'src/shared/proxies/redis.proxy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ConfigConstant.jwt.secretKey,
      signOptions: { expiresIn: ConfigConstant.jwt.expireTime },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisProxy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
