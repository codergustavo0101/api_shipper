import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import MailerConfig from '../config/mail/mail.conf';

@Global()
@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
