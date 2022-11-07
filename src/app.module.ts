import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigConstant } from './config/config.const';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: ConfigConstant.postgres.db,
      host: ConfigConstant.postgres.host,
      port: ConfigConstant.postgres.port,
      username: ConfigConstant.postgres.username,
      password: ConfigConstant.postgres.password,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_: ConfigService) => ({
        config: {
          host: ConfigConstant.redis.host,
          port: ConfigConstant.redis.port,
          name: ConfigConstant.redis.name,
        },
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
