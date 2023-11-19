import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CommonModule } from './common/common.module';
import { ReferralCodeModule } from './referral-code/referral-code.module';
import { PreferencesModule } from './preferences/preferences.module';
import { OtherInformationModule } from './other-information/other-information.module';
import { PhotosModule } from './photos/photos.module';
import { PlansModule } from './plans/plans.module';
import { PricesModule } from './prices/prices.module';
import { StorageModule } from './storage/storage.module';
import { CouponsModule } from './coupons/coupons.module';
import { ProfileRankModule } from './profile-rank/profile-rank.module';
import { MatchRankModule } from './match-rank/match-rank.module';
import { MatchModule } from './match/match.module';
import { LocationModule } from './location/location.module';
import { ReportedModule } from './reported/reported.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: true,
      logging: true,
    }),
    MailModule,
    AuthModule,
    UserModule,
    EstablishmentModule,
    CommonModule,
    ReferralCodeModule,
    PreferencesModule,
    OtherInformationModule,
    PhotosModule,
    PlansModule,
    PricesModule,
    StorageModule,
    CouponsModule,
    ProfileRankModule,
    MatchRankModule,
    MatchModule,
    LocationModule,
    ReportedModule,
    SocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
