import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueExperimentName1565256856941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `experiment` ADD UNIQUE INDEX `IDX_f97e7d16240d480b3eeccdcfa3` (`experimentName`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `experiment` DROP INDEX `IDX_f97e7d16240d480b3eeccdcfa3`");
    }

}
