import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConcreteAndCategory1562516114121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `mpath` varchar(255) NULL DEFAULT '', `parentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `category` ADD CONSTRAINT `FK_d5456fd7e4c4866fec8ada1fa10` FOREIGN KEY (`parentId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `category` DROP FOREIGN KEY `FK_d5456fd7e4c4866fec8ada1fa10`");
        await queryRunner.query("DROP TABLE `category`");
    }

}
