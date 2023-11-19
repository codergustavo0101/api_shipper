import { AuthEntity } from 'src/auth/entities/auth.entity';
import { MatchRankEntity } from 'src/match-rank/entities/match-rank.entity';
import MatchEntity from 'src/match/entities/match.entity';
import OtherInformationEntity from 'src/other-information/entities/other-information.entity';
import PhotosEntity from 'src/photos/entities/photos.entity';
import PreferencesEntity from 'src/preferences/entities/preferences.entity';
import { ProfileRankEntity } from 'src/profile-rank/entities/profile-rank.entity';
import ReferralCodeEntity from 'src/referral-code/entities/referral-code.entity';
import ReportedEntity from 'src/reported/entities/reported.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm';

export const Genders = ['M', 'F'];

enum GenderEnum {
  M = 'M',
  F = 'F',
}

export const Status = ['active', 'reported', 'blocked'];

export enum StatusEnum {
  ACTIVE = 'active',
  REPORTED = 'reported',
  BLOCKED = 'blocked',
}

export type Gender = keyof typeof GenderEnum;

@Entity('user')
export class UserEntity extends BaseEntity {
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
    type: 'date',
    nullable: false,
    name: 'birthdate',
  })
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: Genders,
    nullable: false,
    name: 'gender',
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'description',
  })
  description?: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'incognito',
  })
  incognito: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    nullable: false,
    default: 0,
    name: 'profile_rank',
  })
  profileRank: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    nullable: false,
    default: 0,
    name: 'match_rank',
  })
  matchRank: number;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: StatusEnum.ACTIVE,
    name: 'status',
  })
  status: StatusEnum;

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

  @OneToMany(() => PhotosEntity, (photo) => photo.user)
  photos: PhotosEntity[];

  @OneToOne(() => AuthEntity, (auth) => auth.user)
  auth: AuthEntity;

  @OneToOne(() => ReferralCodeEntity, (referralCode) => referralCode.user)
  referralCode: ReferralCodeEntity;

  @OneToOne(() => PreferencesEntity, (preferences) => preferences.user)
  preferences: PreferencesEntity;

  @OneToMany(
    () => OtherInformationEntity,
    (otherInformation) => otherInformation.user,
  )
  otherInformation: OtherInformationEntity[];

  @OneToMany(() => MatchRankEntity, (matchRank) => matchRank.userFrom)
  matchRanksFrom: MatchRankEntity[];

  @OneToMany(() => MatchRankEntity, (matchRank) => matchRank.userTo)
  matchRanksTo: MatchRankEntity[];

  @OneToMany(() => ProfileRankEntity, (profileRank) => profileRank.userFrom)
  profileRanksFrom: ProfileRankEntity[];

  @OneToMany(() => ProfileRankEntity, (profileRank) => profileRank.userTo)
  profileRanksTo: ProfileRankEntity[];

  @OneToMany(() => MatchEntity, (match) => match.userOne)
  matchUserOne: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.userTwo)
  matchUserTwo: MatchEntity[];

  @OneToMany(() => ReportedEntity, (reported) => reported.user)
  reportedUser: ReportedEntity[];

  @OneToMany(() => ReportedEntity, (reported) => reported.reportedBy)
  reportedUsers: ReportedEntity[];

  age?: number;
  distance?: number;
  city?: string;
  img?: string[];
}
