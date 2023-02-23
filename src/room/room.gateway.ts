import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { RoomService } from "./room.service";
import { ConnectDto } from "./dto/connect.dto";

@WebSocketGateway({cors: {origin: '*'}})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('RoomGateway');

  constructor(private roomService: RoomService) {}

  @SubscribeMessage('connectRoom')
  async handleMessage(client: Socket, payload: ConnectDto): Promise<void> {
    this.logger.log(`connect Room: ${payload}`);
    const answer = await this.roomService.connectRoom(payload);
    this.server.emit(answer);
    this.server.sockets.emit('connectRoom2');
    // this.server.sockets.emit('msgToServer', {test: 'testMessage'});
  }

  afterInit(server: Server) {
    console.log('init');
    this.logger.log('init');
  }

  handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]){
    // this.server.emit('msgToServer', 'test');
    console.log(`Client connected: ${client.id}, ${args}`);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
