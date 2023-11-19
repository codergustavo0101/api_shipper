import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRankEntity } from './entities/profile-rank.entity';
import { ProfileRankController } from './profile-rank.controller';
import { ProfileRankService } from './profile-rank.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRankEntity])],
  controllers: [ProfileRankController],
  providers: [ProfileRankService],
})
export class ProfileRankModule {}
