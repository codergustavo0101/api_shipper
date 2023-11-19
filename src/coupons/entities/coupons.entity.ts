import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity('coupons')
export class CouponsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'product',
  })
  product: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'discount',
  })
  discount: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'quantity',
  })
  quantity: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
    name: 'description',
  })
  description: string;

  @Column({
    type: 'date',
    nullable: false,
    name: 'expiration',
  })
  expiration: Date;

  @ManyToOne(
    () => EstablishmentEntity,
    (establishment) => establishment.coupons,
  )
  establishment: EstablishmentEntity;
}
