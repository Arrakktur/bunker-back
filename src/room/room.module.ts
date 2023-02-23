import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomEntity } from "./room.entity";
import { RoomGateway } from "./room.gateway";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, UserEntity])],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway]
})
export class RoomModule {}
