import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('match_rank')
export class MatchRankEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    nullable: false,
    default: 0,
    name: 'rank',
  })
  rank: number;

  @ManyToOne(() => UserEntity, (user) => user.matchRanksFrom)
  @JoinColumn({ name: 'user_from' })
  userFrom: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.matchRanksTo)
  @JoinColumn({ name: 'user_to' })
  userTo: UserEntity;
}
