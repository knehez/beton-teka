import {MigrationInterface, QueryRunner} from "typeorm";

export class nullablePropertyColumn1563524122909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `concrete` CHANGE `properties` `properties` json NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `concrete` CHANGE `properties` `properties` json NOT NULL");
    }

}
