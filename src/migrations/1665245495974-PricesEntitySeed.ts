import PricesEntity from 'src/prices/entities/prices.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PricesEntitySeed1665245495974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const prices = [];

    prices.push(
      {
        month: 1,
        price: 19.9,
      },
      {
        month: 6,
        price: 12.73,
      },
      {
        month: 12,
        price: 7.0,
      },
    );

    await queryRunner.manager.save(PricesEntity, prices);

    return;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
