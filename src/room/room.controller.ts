import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomEntity } from "./room.entity";
import { CreateRoomDto } from "./dto/createRoom.dto";
import { ConnectDto } from "./dto/connect.dto";

@Controller('room')
export class RoomController {

  constructor(private roomService: RoomService) {}

  /**
   * Получение списка комнат
   */
  @Get()
  getAll(): Promise<RoomEntity[]>{
    return this.roomService.getAll();
  }

  /**
   * Создание комнаты
   * @param {CreateRoomDto} createRoomDto
   */
  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity>{
    return this.roomService.createRoom(createRoomDto);
  }

  /**
   * Проверка возможности подключения к комнате
   * @param {ConnectDto} connectDto
   */
  @Post('connect')
  connect(@Body() connectDto: ConnectDto){
    return this.roomService.checkConnect(connectDto);
  }
}
