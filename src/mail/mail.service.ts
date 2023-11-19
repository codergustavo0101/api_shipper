import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/user/entities/user.entity';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeMailUser(user: UserEntity): Promise<void> {
    const userWithEmail = await UserEntity.findOne({
      where: { id: user.id },
      relations: ['auth'],
    });

    try {
      await this.mailerService.sendMail({
        to: userWithEmail.auth.email,
        subject: `Bem-vindo ao ${process.env.APP_NAME}`,
        template: './welcome',
        context: {
          name: userWithEmail.name,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async sendWelcomeMailEstablishment(
    establishment: EstablishmentEntity,
  ): Promise<void> {
    const establishmentWithEmail = await EstablishmentEntity.findOne({
      where: { id: establishment.id },
      relations: ['auth'],
    });

    try {
      await this.mailerService.sendMail({
        to: establishmentWithEmail.auth.email,
        subject: `Bem-vindo ao ${process.env.APP_NAME}`,
        template: './welcome',
        context: {
          name: establishmentWithEmail.name,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async sendRecoverPasswordMail(auth: AuthEntity): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: auth.email,
        subject: `Recuperação de senha`,
        template: './recover-password',
        context: {
          // url: `${process.env.APP_URL}/auth/recover-password/${auth.recoverPasswordToken}`,
          url: `https://google.com`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }
}
