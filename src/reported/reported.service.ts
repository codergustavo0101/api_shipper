import { Injectable, NotAcceptableException } from '@nestjs/common';
import { StatusEnum, UserEntity } from 'src/user/entities/user.entity';
import ReportUserDto from './dto/report-user.dto';
import ReportedEntity from './entities/reported.entity';

@Injectable()
export class ReportedService {
  async reportUser(userId: string, reportUserDto: ReportUserDto) {
    const promises = [];

    promises.push(
      UserEntity.findOneOrFail({
        where: { id: userId },
      }),
    );

    promises.push(
      UserEntity.findOneOrFail({
        where: { id: reportUserDto.userId },
      }),
    );

    try {
      const [currentUser, reportedUser] = await Promise.all(promises);

      const alreadyReportedQuery =
        ReportedEntity.createQueryBuilder('reported');

      alreadyReportedQuery
        .where('reported.user = :userId', {
          userId: reportedUser.id,
        })
        .andWhere('reported.reportedBy = :reportedBy', {
          reportedBy: currentUser.id,
        });

      const alreadyReported = await alreadyReportedQuery.getOne();

      if (currentUser.id === reportedUser.id) {
        throw new Error('You cannot report yourself');
      }

      reportedUser.status = StatusEnum.REPORTED;

      await reportedUser.save();

      if (alreadyReported)
        return {
          success: true,
        };

      const newReport = new ReportedEntity();
      newReport.user = reportedUser;
      newReport.reportedBy = currentUser;

      await newReport.save();

      return {
        success: true,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
