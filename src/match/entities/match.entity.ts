import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum MatchStatusEnum {
  LIKED = 'LIKED',
  MATCH = 'MATCH',
}

export type MatchStatus = keyof typeof MatchStatusEnum;

@Entity('match')
export default class MatchEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.matchUserOne)
  @JoinColumn({ name: 'user_one' })
  userOne: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.matchUserTwo)
  @JoinColumn({ name: 'user_two' })
  userTwo: UserEntity;

  @Column({
    type: 'enum',
    enum: MatchStatusEnum,
    nullable: false,
    default: MatchStatusEnum.LIKED,
    name: 'status',
  })
  status: MatchStatus;
}
