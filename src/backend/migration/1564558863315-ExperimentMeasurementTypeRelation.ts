import {MigrationInterface, QueryRunner} from "typeorm";

export class ExperimentMeasurementTypeRelation1564558863315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `unit`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `note`");
        await queryRunner.query("ALTER TABLE `measurement` ADD `measurementData` json NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `measurementTypeId` int NULL");
        await queryRunner.query("ALTER TABLE `experiment` ADD `cups` int NOT NULL");
        await queryRunner.query("ALTER TABLE `experiment` ADD `date` datetime");
        await queryRunner.query("ALTER TABLE `experiment` ADD `adds` json NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD CONSTRAINT `FK_93de07c16af23d14bedfc8541fa` FOREIGN KEY (`measurementTypeId`) REFERENCES `measurement_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` DROP FOREIGN KEY `FK_93de07c16af23d14bedfc8541fa`");
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `adds`");
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `date`");
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `cups`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `measurementTypeId`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `measurementData`");
        await queryRunner.query("ALTER TABLE `measurement` ADD `note` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `unit` int NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `value` int NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `name` varchar(255) NOT NULL");
    }

}
