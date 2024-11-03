import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedAdminUser1730575108936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminUser = await queryRunner.query(
      `SELECT * FROM "user" WHERE email = 'admin@example.com'`,
    );

    if (adminUser.length === 0) {
      const passwordHash = await bcrypt.hash('admin', 10);

      await queryRunner.query(
        `INSERT INTO "user" (name, lastname, email, password, is_active, role)
                 VALUES ('System','Admin', 'admin@example.com', '${passwordHash}', true, 'ADMIN')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'admin@example.com'`,
    );
  }
}
