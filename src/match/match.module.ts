import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import MatchEntity from './entities/match.entity';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity]), SocketModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
