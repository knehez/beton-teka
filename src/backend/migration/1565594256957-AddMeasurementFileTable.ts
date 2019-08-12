import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMeasurementFileTable1565594256957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `measurement_file` (`id` int NOT NULL AUTO_INCREMENT, `lastModifiedDate` datetime NOT NULL, `name` varchar(255) NOT NULL, `size` int NOT NULL, `type` varchar(255) NOT NULL, `data` varchar(255) NOT NULL, `measurementId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `measurement_file` ADD CONSTRAINT `FK_d21a78cb94fbbd3db87cf8ce8a3` FOREIGN KEY (`measurementId`) REFERENCES `measurement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `measurement_file` DROP FOREIGN KEY `FK_d21a78cb94fbbd3db87cf8ce8a3`");
        await queryRunner.query("DROP TABLE `measurement_file`");
    }

}
