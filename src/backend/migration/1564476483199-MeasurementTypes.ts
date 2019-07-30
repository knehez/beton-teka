import {MigrationInterface, QueryRunner} from "typeorm";

export class MeasurementTypes1564476483199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_1803e796993dd9c0f6cd06ba06e`");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_8bc04fdb1665c05c48e9c5ae17a`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `user_roles_role_ibfk_1`");
        await queryRunner.query("DROP INDEX `roleName` ON `role`");
        await queryRunner.query("DROP INDEX `user_email_unique` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_1803e796993dd9c0f6cd06ba06` ON `concrete_categories_category`");
        await queryRunner.query("DROP INDEX `IDX_8bc04fdb1665c05c48e9c5ae17` ON `concrete_categories_category`");
        await queryRunner.query("DROP INDEX `user_role_unique` ON `user_roles_role`");
        await queryRunner.query("CREATE TABLE `measurement_type` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `experimentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `unit`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `note`");
        await queryRunner.query("ALTER TABLE `measurement` ADD `standard` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `experiment` ADD `date` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `experiment` ADD `adds` json NOT NULL");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD PRIMARY KEY (`userId`, `roleId`)");
        await queryRunner.query("ALTER TABLE `concrete` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `concrete` ADD `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `role` DROP COLUMN `roleName`");
        await queryRunner.query("ALTER TABLE `role` ADD `roleName` varchar(255) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_6ea93cd566def1debf0638a739` ON `concrete_categories_category` (`concreteId`)");
        await queryRunner.query("CREATE INDEX `IDX_09e6fdf687d4769b0b0ed7f39a` ON `concrete_categories_category` (`categoryId`)");
        await queryRunner.query("CREATE INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role` (`userId`)");
        await queryRunner.query("CREATE INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role` (`roleId`)");
        await queryRunner.query("ALTER TABLE `measurement_type` ADD CONSTRAINT `FK_f7c56cec5ebb2cdfc3ebbf6f257` FOREIGN KEY (`experimentId`) REFERENCES `experiment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_6ea93cd566def1debf0638a7397` FOREIGN KEY (`concreteId`) REFERENCES `concrete`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_09e6fdf687d4769b0b0ed7f39ad` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_09e6fdf687d4769b0b0ed7f39ad`");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` DROP FOREIGN KEY `FK_6ea93cd566def1debf0638a7397`");
        await queryRunner.query("ALTER TABLE `measurement_type` DROP FOREIGN KEY `FK_f7c56cec5ebb2cdfc3ebbf6f257`");
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`");
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`");
        await queryRunner.query("DROP INDEX `IDX_09e6fdf687d4769b0b0ed7f39a` ON `concrete_categories_category`");
        await queryRunner.query("DROP INDEX `IDX_6ea93cd566def1debf0638a739` ON `concrete_categories_category`");
        await queryRunner.query("ALTER TABLE `role` DROP COLUMN `roleName`");
        await queryRunner.query("ALTER TABLE `role` ADD `roleName` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `concrete` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `concrete` ADD `description` varchar(640) NOT NULL");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `adds`");
        await queryRunner.query("ALTER TABLE `experiment` DROP COLUMN `date`");
        await queryRunner.query("ALTER TABLE `measurement` DROP COLUMN `standard`");
        await queryRunner.query("ALTER TABLE `measurement` ADD `note` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `unit` int NOT NULL");
        await queryRunner.query("ALTER TABLE `measurement` ADD `value` int NOT NULL");
        await queryRunner.query("DROP TABLE `measurement_type`");
        await queryRunner.query("CREATE UNIQUE INDEX `user_role_unique` ON `user_roles_role` (`userId`, `roleId`)");
        await queryRunner.query("CREATE INDEX `IDX_8bc04fdb1665c05c48e9c5ae17` ON `concrete_categories_category` (`concreteId`)");
        await queryRunner.query("CREATE INDEX `IDX_1803e796993dd9c0f6cd06ba06` ON `concrete_categories_category` (`categoryId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`)");
        await queryRunner.query("CREATE UNIQUE INDEX `roleName` ON `role` (`roleName`)");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `user_roles_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_8bc04fdb1665c05c48e9c5ae17a` FOREIGN KEY (`concreteId`) REFERENCES `concrete`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `concrete_categories_category` ADD CONSTRAINT `FK_1803e796993dd9c0f6cd06ba06e` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
