import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatEntity } from './entities/chat.entities';
import { SocketEntity } from './entities/socket.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, SocketEntity])],
  providers: [ChatGateway],
})
export class ChatModule {}
