import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710890152867 implements MigrationInterface {
  name = 'Migration1710890152867';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_categories_category" DROP CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c"`);
    await queryRunner.query(
      `ALTER TABLE "news_categories_category" ADD CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_categories_category" DROP CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c"`);
    await queryRunner.query(
      `ALTER TABLE "news_categories_category" ADD CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
