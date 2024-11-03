import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1730573997808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
              CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "lastname" VARCHAR(100) NOT NULL,
                "email" VARCHAR(100) UNIQUE NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "is_active" BOOLEAN DEFAULT true,
                "role" VARCHAR(20) DEFAULT 'USER',
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE "user";`);
  }
}
