import { Injectable } from '@nestjs/common';
import { RoomEntity } from "./room.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./dto/createRoom.dto";
import { Guid } from "guid-ts";
import { ConnectDto } from "./dto/connect.dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity) private roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {
  }

  getAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity>{
    const guid = Guid.newGuid().toString();
    return this.roomRepository.save({
      guid: guid,
      status: 'wait',
      players: 0,
      ...createRoomDto
    });
  }

  // проверка на возможность подключения
  checkConnect(connectDto: ConnectDto){
    return true;
  }

  async connectRoom(connectDto: ConnectDto){
    console.log('connectRoom');
    const room = await this.roomRepository.findOneBy({guid: connectDto.guidRoom});
    const user = await this.userRepository.findOneBy({token: connectDto.token});
    if (room && user) {
      return 'yes';
    } else {
      return 'error';
    }
  }
}
