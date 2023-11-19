import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export default class RankMatchDto {
  @ApiProperty({
    description: 'The user id',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The rank',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(5)
  rank: number;
}
