import {MigrationInterface, QueryRunner} from "typeorm";

export class ExperimentMeasurementRelation1563268872220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` ADD `experimentId` int NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD CONSTRAINT `FK_6b6e4936818d76b783b18ff5ac6` FOREIGN KEY (`experimentId`) REFERENCES `experiment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement` DROP FOREIGN KEY `FK_6b6e4936818d76b783b18ff5ac6`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `experimentId`");
    }

}
