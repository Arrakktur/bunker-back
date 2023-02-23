import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Guid } from "guid-ts";

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  guid: string;

  @Column()
  status: string;

  @Column()
  players: number;

  @Column()
  admin: number;
}