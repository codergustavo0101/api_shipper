import PlansEntity from 'src/plans/entities/plans.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlansEntitySeed1665245102499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const plans = [];

    plans.push(
      {
        benefit: 'Likes ilimitados',
        free: true,
        vip: true,
      },
      {
        benefit: 'Mensagens ilimitadas',
        free: true,
        vip: true,
      },
      {
        benefit: 'Cupons de Match',
        free: true,
        vip: true,
      },
      {
        benefit: 'Check-in de Vantagens',
        free: true,
        vip: true,
      },
      {
        benefit: 'Agenda de Encontros',
        free: true,
        vip: true,
      },
      {
        benefit: 'Me curtiu',
        free: false,
        vip: true,
      },
      {
        benefit: 'Minhas notas',
        free: false,
        vip: true,
      },
    );

    await queryRunner.manager.save(PlansEntity, plans);

    return;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
