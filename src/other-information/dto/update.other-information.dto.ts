import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  OtherInformationQuestions,
  OtherInformationQuestionType,
} from '../entities/other-information.entity';

export default class UpdateOtherInformationDto {
  @ApiProperty({
    description: 'Other Information Question',
    example: 'Você tem filhos? (Opcional)',
    enum: OtherInformationQuestions,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(OtherInformationQuestions))
  question: OtherInformationQuestionType;

  @ApiProperty({
    description: 'Other Information Answer',
    example: '2',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
