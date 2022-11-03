import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SocketEntity } from './socket.entities';

@Entity()
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  user: string;
  //   @ManyToOne(() => SocketEntity)
  //   @JoinColumn()
  //   @IsString()
  //   @IsNotEmpty()
  //   user: SocketEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  chat: string;
}
