import { MigrationInterface, QueryRunner } from "typeorm";

export class Removeuuid1732860912978 implements MigrationInterface {
    name = 'Removeuuid1732860912978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "uuid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "uuid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "uuid" character varying NOT NULL`);
    }

}
