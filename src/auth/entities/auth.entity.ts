import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity('auth')
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['user', 'establishment'],
    nullable: false,
    name: 'type',
  })
  type: 'user' | 'establishment';

  @OneToOne(() => UserEntity, (user) => user.auth)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToOne(() => EstablishmentEntity, (establishment) => establishment.auth)
  @JoinColumn({ name: 'establishment_id' })
  establishment?: EstablishmentEntity;
}
