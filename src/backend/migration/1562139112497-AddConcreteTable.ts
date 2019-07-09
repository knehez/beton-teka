import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConcreteTable1562139112497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `concrete` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `description` VARCHAR(640) NOT NULL , `properties` JSON NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDb;");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `concrete`");
    }

}
