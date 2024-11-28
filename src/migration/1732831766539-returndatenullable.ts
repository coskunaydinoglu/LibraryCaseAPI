import { MigrationInterface, QueryRunner } from "typeorm";

export class Returndatenullable1732831766539 implements MigrationInterface {
    name = 'Returndatenullable1732831766539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" ALTER COLUMN "returnDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow" ALTER COLUMN "score" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" ALTER COLUMN "score" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow" ALTER COLUMN "returnDate" SET NOT NULL`);
    }

}
