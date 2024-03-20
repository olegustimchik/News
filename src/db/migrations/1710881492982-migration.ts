import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710881492982 implements MigrationInterface {
  name = 'Migration1710881492982';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categoryTranslation" ADD "language" character varying(50) NOT NULL`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categoryTranslation" DROP COLUMN "language"`);
  }
}
