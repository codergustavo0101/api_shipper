import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PhotoType {
  PROFILE = 'profile',
  MENU = 'menu',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

@Entity('photos')
export default class PhotosEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'photo_url',
  })
  photoUrl: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'order',
    default: 1,
  })
  order: number;

  @Column({
    type: 'enum',
    enum: PhotoType,
    nullable: false,
    name: 'type',
    default: PhotoType.PROFILE,
  })
  type: PhotoType;

  @ManyToOne(() => UserEntity, (user) => user.photos)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.photos)
  @JoinColumn({ name: 'establishment_id' })
  establishment?: EstablishmentEntity;
}
