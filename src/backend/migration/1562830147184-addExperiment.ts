import { MigrationInterface, QueryRunner } from "typeorm";

export class addExperiment1562830147184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `experiment` (`id` int NOT NULL AUTO_INCREMENT, `experimentName` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `experiment`");
    }

}
