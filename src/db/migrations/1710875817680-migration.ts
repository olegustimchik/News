import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710875817680 implements MigrationInterface {
  name = 'Migration1710875817680';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categoryTranslation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_0a46263ad763fe37554abe45b5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "newsTranslation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(250) NOT NULL, "description" character varying(250) NOT NULL, "language" character varying(50) NOT NULL, "newsId" uuid, CONSTRAINT "PK_b0ed4d83a798da5e013b4a6e115" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news_categories_category" ("newsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_f241f60da84222be28f29b958c3" PRIMARY KEY ("newsId", "categoryId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d2f307c6f288fb4036451f66b4" ON "news_categories_category" ("newsId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_be92a478c9420fabbc97abb6d9" ON "news_categories_category" ("categoryId") `,
    );
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "categoryTranslation" ADD CONSTRAINT "FK_7f652cf183af7407afe542e0682" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "newsTranslation" ADD CONSTRAINT "FK_9e1af8309d3ce2928f313c1ca74" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_categories_category" ADD CONSTRAINT "FK_d2f307c6f288fb4036451f66b4d" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_categories_category" ADD CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_categories_category" DROP CONSTRAINT "FK_be92a478c9420fabbc97abb6d9c"`);
    await queryRunner.query(`ALTER TABLE "news_categories_category" DROP CONSTRAINT "FK_d2f307c6f288fb4036451f66b4d"`);
    await queryRunner.query(`ALTER TABLE "newsTranslation" DROP CONSTRAINT "FK_9e1af8309d3ce2928f313c1ca74"`);
    await queryRunner.query(`ALTER TABLE "categoryTranslation" DROP CONSTRAINT "FK_7f652cf183af7407afe542e0682"`);
    await queryRunner.query(`ALTER TABLE "news" ADD "description" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "news" ADD "title" character varying(250) NOT NULL`);
    await queryRunner.query(`DROP INDEX "public"."IDX_be92a478c9420fabbc97abb6d9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d2f307c6f288fb4036451f66b4"`);
    await queryRunner.query(`DROP TABLE "news_categories_category"`);
    await queryRunner.query(`DROP TABLE "newsTranslation"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "categoryTranslation"`);
  }
}
