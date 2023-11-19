import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { ConnectedSocket } from '@nestjs/websockets/decorators/connected-socket.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({ namespace: 'match', cors: true })
export class SocketGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private wsClients = {};

  handleDisconnect(client: Socket) {
    this.wsClients = Object.keys(this.wsClients).reduce((acc, key) => {
      if (this.wsClients[key] !== client.id) {
        acc[key] = this.wsClients[key];
      }
      return acc;
    }, {});
  }

  @SubscribeMessage('listen-match')
  async listenMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() id: string,
  ) {
    this.wsClients[id] = client.id;

    console.log('User connected', id);

    return;
  }

  notifyMatch(userOneId: string, userTwoId: string, data: any) {
    const userOneSocketId = this.wsClients[userOneId];
    const userTwoSocketId = this.wsClients[userTwoId];

    if (userOneSocketId) {
      this.server.to(userOneSocketId).emit('match', data);
    }

    if (userTwoSocketId) {
      this.server.to(userTwoSocketId).emit('match', data);
    }

    console.log('userOneSocketId', userOneId);
    console.log('userTwoSocketId', userTwoId);

    return;
  }
}
