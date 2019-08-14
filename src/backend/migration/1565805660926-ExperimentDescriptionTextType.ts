import {MigrationInterface, QueryRunner} from "typeorm";

export class ExperimentDescriptionTextType1565805660926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `experiment` ADD `description` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `experiment` ADD `description` varchar(255) NOT NULL");
    }

}
