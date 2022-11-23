import { MigrationInterface, QueryRunner } from "typeorm";

export class demo1669223496363 implements MigrationInterface {
    name = 'demo1669223496363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foo" ADD "lastName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foo" DROP COLUMN "lastName"`);
    }

}
