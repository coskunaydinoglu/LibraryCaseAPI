import { MigrationInterface, QueryRunner } from "typeorm";

export class Addavailable1732831257309 implements MigrationInterface {
    name = 'Addavailable1732831257309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "available" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "available"`);
    }

}
