import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prices')
export default class PricesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'month',
  })
  month: number;

  @Column({
    type: 'float',
    nullable: false,
    name: 'price',
    precision: 10,
  })
  price: number;
}
