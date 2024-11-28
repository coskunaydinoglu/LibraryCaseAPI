import { MigrationInterface, QueryRunner } from "typeorm";

export class Addscore1732827252561 implements MigrationInterface {
    name = 'Addscore1732827252561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" ADD "score" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" DROP COLUMN "score"`);
    }

}
