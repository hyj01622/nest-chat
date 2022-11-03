import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { ChatEntity } from './entities/chat.entities';
import { SocketEntity } from './entities/socket.entities';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('chat');

  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(SocketEntity)
    private readonly socketRepository: Repository<SocketEntity>,
  ) {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.socketRepository.findOneBy({ sid: socket.id });
    await this.socketRepository.delete({ sid: socket.id });
    socket.broadcast.emit('disconnect_user', `${user?.name}`);
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user')
  async handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    const exist = await this.socketRepository.findOneBy({ name: username });
    if (exist) username = `${username}_${Math.floor(Math.random() * 100)}`;
    const created = this.socketRepository.create({ sid: socket.id, name: username });
    await this.socketRepository.insert(created);
    socket.broadcast.emit('user_connected', username);
    return 'hello' + username;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(@MessageBody() chat: string, @ConnectedSocket() socket: Socket) {
    const socketObj = await this.socketRepository.findOneBy({ sid: socket.id });
    const created = this.chatRepository.create({
      user: JSON.stringify(socketObj),
      chat,
    });
    await this.chatRepository.insert(created);
    socket.broadcast.emit('new_chat', { chat, username: socketObj.name });
  }
}
