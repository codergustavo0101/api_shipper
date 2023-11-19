import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Benefits {
  'Likes ilimitados' = 'Likes ilimitados',
  'Mensagens ilimitadas' = 'Mensagens ilimitadas',
  'Cupons de Match' = 'Cupons de Match',
  'Check-in de Vantagens' = 'Check-in de Vantagens',
  'Agenda de Encontros' = 'Agenda de Encontros',
  'Me curtiu' = 'Me curtiu',
  'Minhas notas' = 'Minhas notas',
}

export type Benefit = keyof typeof Benefits;

@Entity('plans')
export default class PlansEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Benefits,
    nullable: false,
    name: 'benefit',
  })
  benefit: Benefit;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'free',
  })
  free: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'vip',
  })
  vip: boolean;
}
