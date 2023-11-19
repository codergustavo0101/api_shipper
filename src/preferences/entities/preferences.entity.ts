import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SexPreferenceEnum {
  M = 'M',
  F = 'F',
  BOTH = 'BOTH',
}

export type SexPreference = keyof typeof SexPreferenceEnum;

@Entity('preferences')
export default class PreferencesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'city',
  })
  city: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'min_age_preference',
  })
  minAgePreference: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'max_age_preference',
  })
  maxAgePreference: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'max_distance',
  })
  maxDistance: number;

  @Column({
    type: 'enum',
    enum: SexPreferenceEnum,
    nullable: false,
    name: 'sex_preference',
  })
  sexPreference: SexPreference;

  @OneToOne(() => UserEntity, (user) => user.preferences)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
