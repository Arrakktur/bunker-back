import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomModule } from './room/room.module';
import { RoomEntity } from "./room/room.entity";
import { UserModule } from './user/user.module';
import { UserEntity } from "./user/user.entity";
import { RoomGateway } from './room/room.gateway';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database',
      entities: [RoomEntity, UserEntity],
      synchronize: true,
    }),
    RoomModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
