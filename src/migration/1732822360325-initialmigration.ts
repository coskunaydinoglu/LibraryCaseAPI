import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialmigration1732822360325 implements MigrationInterface {
    name = 'Initialmigration1732822360325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrow" ("id" SERIAL NOT NULL, "borrowDate" TIMESTAMP NOT NULL DEFAULT now(), "returnDate" TIMESTAMP NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD CONSTRAINT "FK_f5c8ea379eee06ce1482f20d101" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD CONSTRAINT "FK_395ef8d1ea4a0ff8f1fa17f67ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" DROP CONSTRAINT "FK_395ef8d1ea4a0ff8f1fa17f67ad"`);
        await queryRunner.query(`ALTER TABLE "borrow" DROP CONSTRAINT "FK_f5c8ea379eee06ce1482f20d101"`);
        await queryRunner.query(`DROP TABLE "borrow"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
