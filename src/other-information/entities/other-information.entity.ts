import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OtherInformationQuestions {
  'Você tem filhos? (Opcional)' = 'Você tem filhos? (Opcional)',
  'Você fuma? (Opcional)' = 'Você fuma? (Opcional)',
  'Qual é sua altura? (Opcional)' = 'Qual é sua altura? (Opcional)',
  'Qual é sua escolaridade? (Opcional)' = 'Qual é sua escolaridade? (Opcional)',
  'Qual é sua profissão? (Opcional)' = 'Qual é sua profissão? (Opcional)',
  'Você tá vacinado do COVID-19? (Opcional)' = 'Você tá vacinado do COVID-19? (Opcional)',
  'Instagram (Opcional)' = 'Instagram (Opcional)',
  'Linkedin (Opcional)' = 'Linkedin (Opcional)',
  'Morando em (Opcional)' = 'Morando em (Opcional)',
  'Orientação sexual (Opcional)' = 'Orientação sexual (Opcional)',
}

export type OtherInformationQuestionType =
  keyof typeof OtherInformationQuestions;

@Entity('other_information')
export default class OtherInformationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OtherInformationQuestions,
    nullable: false,
    name: 'question',
  })
  question: OtherInformationQuestionType;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'answer',
  })
  answer?: string;

  @ManyToOne(() => UserEntity, (user) => user.otherInformation)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
