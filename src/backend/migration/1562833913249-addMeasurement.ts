import {MigrationInterface, QueryRunner} from "typeorm";

export class addMeasurement1562833913249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query("CREATE TABLE `measurement` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `value` int NOT NULL, `unit` int NOT NULL, `note` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `measurement`");
    }
}
