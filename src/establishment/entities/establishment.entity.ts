import { AuthEntity } from 'src/auth/entities/auth.entity';
import { CouponsEntity } from 'src/coupons/entities/coupons.entity';
import PhotosEntity from 'src/photos/entities/photos.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('establishment')
export class EstablishmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'address',
  })
  address: string;

  @Column({
    type: 'float',
    nullable: false,
    name: 'lat',
    precision: 10,
    scale: 6,
  })
  lat: number;

  @Column({
    type: 'float',
    nullable: false,
    name: 'lng',
    precision: 10,
    scale: 6,
  })
  lng: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'instagram',
  })
  instagram: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    nullable: false,
    default: 0,
    name: 'profile_rank',
  })
  profileRank: number;

  @OneToOne(() => AuthEntity, (auth) => auth.establishment)
  auth: AuthEntity;

  @OneToMany(() => PhotosEntity, (photo) => photo.establishment)
  photos: PhotosEntity[];

  @OneToMany(() => CouponsEntity, (coupon) => coupon.establishment)
  coupons: CouponsEntity[];
}
