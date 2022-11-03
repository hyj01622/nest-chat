import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { ChatEntity } from './chat/entities/chat.entities';
import { SocketEntity } from './chat/entities/socket.entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ghdduwls1',
      database: 'chat',
      entities: [ChatEntity, SocketEntity],
      synchronize: true,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
