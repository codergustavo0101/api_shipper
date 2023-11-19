import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('referral_code')
export default class ReferralCodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: false,
    unique: true,
  })
  code: string;

  @OneToOne(() => UserEntity, (user) => user.referralCode)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
