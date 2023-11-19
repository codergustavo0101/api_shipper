import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: '951d4c732874f7',
      pass: 'ada84e1dcca50b',
    },
  },
  defaults: {
    from: `"${process.env.APP_NAME}" <${process.env.APP_NO_REPLY_EMAIL}>`,
  },
  preview: true,
  template: {
    dir: 'src/mail/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

export default mailerConfig;
