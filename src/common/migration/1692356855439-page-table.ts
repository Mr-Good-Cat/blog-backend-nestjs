import { MigrationInterface, QueryRunner } from 'typeorm';

export class PageTable1692356855439 implements MigrationInterface {
  name = 'PageTable1692356855439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."page_type_enum" AS ENUM('MAIN_CATEGORY', 'CATEGORY', 'ARTICLE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."page_status_enum" AS ENUM('PENDING', 'PUBLISHED', 'DELETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "page" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "order" integer, "type" "public"."page_type_enum" NOT NULL, "seo_title" character varying NOT NULL, "seo_description" character varying NOT NULL, "path" ltree, "slug" character varying NOT NULL, "status" "public"."page_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TYPE "public"."page_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."page_type_enum"`);
  }
}
