import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1749220736852 implements MigrationInterface {
    name = 'NewMigration1749220736852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "nameRu" character varying NOT NULL, "nameEn" character varying, "scale" numeric(10,4) NOT NULL, "rate" numeric(10,4) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "currencies"`);
    }

}
