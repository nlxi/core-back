import { MigrationInterface, QueryRunner } from 'typeorm';

export class demo1669220564255 implements MigrationInterface {
  name = 'demo1669220564255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "foo" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, CONSTRAINT "PK_3955faa3e62aba1963fccbe0708" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "foo"`);
  }
}
