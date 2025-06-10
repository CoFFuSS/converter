import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1749477167613 implements MigrationInterface {
  name = 'NewMigration1749477167613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "conversion_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "baseCurrency" character varying NOT NULL, "baseValue" numeric(18,6) NOT NULL, "targetCurrencies" jsonb NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "source" character varying NOT NULL, CONSTRAINT "PK_1e13829068f5a4f9fb7dc1c9f5c" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "conversion_transaction"`);
  }
}
