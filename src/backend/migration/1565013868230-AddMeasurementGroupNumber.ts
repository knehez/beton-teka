import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMeasurementGroupNumber1565013868230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` ADD `group` int NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `group`");
    }

}
