import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoryConcreteRelation1562578279381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `concrete_categories_category` (`categoryId` int NOT NULL, `concreteId` int NOT NULL, INDEX `IDX_1803e796993dd9c0f6cd06ba06` (`categoryId`), INDEX `IDX_8bc04fdb1665c05c48e9c5ae17` (`concreteId`), PRIMARY KEY (`categoryId`, `concreteId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_1803e796993dd9c0f6cd06ba06e` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_8bc04fdb1665c05c48e9c5ae17a` FOREIGN KEY (`concreteId`) REFERENCES `concrete`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_8bc04fdb1665c05c48e9c5ae17a`");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_1803e796993dd9c0f6cd06ba06e`");
        await queryRunner.query("DROP INDEX `IDX_8bc04fdb1665c05c48e9c5ae17` ON `concrete_categories_category`");
        await queryRunner.query("DROP INDEX `IDX_1803e796993dd9c0f6cd06ba06` ON `concrete_categories_category`");
        await queryRunner.query("DROP TABLE `concrete_categories_category`");
    }

}
