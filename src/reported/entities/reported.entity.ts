import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reported')
export default class ReportedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.reportedUser)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.reportedUsers)
  @JoinColumn({ name: 'reported_by_id' })
  reportedBy?: UserEntity;
}
