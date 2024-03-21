import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710953066409 implements MigrationInterface {
    name = 'Migration1710953066409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "newsToCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "newsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_253843c66261f8f374dd92e1f74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "newsToCategory" ADD CONSTRAINT "FK_d5179ced0399894cf586da7cba6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsToCategory" ADD CONSTRAINT "FK_4bf42e2b516a54992db30fb7ba5" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsToCategory" DROP CONSTRAINT "FK_4bf42e2b516a54992db30fb7ba5"`);
        await queryRunner.query(`ALTER TABLE "newsToCategory" DROP CONSTRAINT "FK_d5179ced0399894cf586da7cba6"`);
        await queryRunner.query(`DROP TABLE "newsToCategory"`);
    }

}
