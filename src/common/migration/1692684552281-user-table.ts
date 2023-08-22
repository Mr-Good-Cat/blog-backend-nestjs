import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1692684552281 implements MigrationInterface {
    name = 'UserTable1692684552281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "signToken" character varying, "refreshToken" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_wallet" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_ac2af862c8540eccb210b293107" UNIQUE ("address"), CONSTRAINT "PK_b453ec3d9d579f6b9699be98beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267"`);
        await queryRunner.query(`DROP TABLE "user_wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
