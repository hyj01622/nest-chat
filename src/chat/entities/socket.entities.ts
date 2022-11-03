import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  sid: string;
}
