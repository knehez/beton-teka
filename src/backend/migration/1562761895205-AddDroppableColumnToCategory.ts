import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDroppableColumnToCategory1562761895205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `category` ADD `droppable` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `category` DROP COLUMN `droppable`");
    }

}
