import {MigrationInterface, QueryRunner} from "typeorm";

export class Base64MediumTextColumn1565599891600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement_file` DROP COLUMN `data`");
        await queryRunner.query("ALTER TABLE `measurement_file` ADD `data` mediumtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement_file` DROP COLUMN `data`");
        await queryRunner.query("ALTER TABLE `measurement_file` ADD `data` varchar(255) NOT NULL");
    }

}
