import { getRepository, getConnection } from 'typeorm';
import BaseCtrl from './base.controller';
import { Measurement } from '../entities/measurement';
import { Experiment } from '../entities/experiment';

export default class MeasurementCtrl extends BaseCtrl {
    model = getRepository(Measurement);

    experimentRepository = getRepository(Experiment);

    private getDefaultMeasurementData () {
        return {
            data: []
        };
    }

    createNewMeasurementGroup = async (req, res) =>  {

        const experimentId = req.body.experimentId;
        const measurementData = JSON.stringify(this.getDefaultMeasurementData());

        const nextGroup = await getConnection()
            .query('SELECT MAX(\`group\`)+1 AS id FROM measurement WHERE experimentId=?', [ experimentId ]);

        const nextGroupId = Number(nextGroup[0].id);

        await getConnection()
            .query(
                `INSERT INTO measurement (\`group\`, experimentId, measurementTypeId, measurementData)
                SELECT DISTINCT
                    ? AS \`group\`,
                    experimentId,
                    measurementTypeId,
                    ? AS measurementData
                FROM
                    measurement
                WHERE
                    experimentId=?`,
                [ nextGroupId, measurementData, experimentId ]
            );

        res.json({
            success: true,
            data: {
                groupId: nextGroupId
            }
        });
    }
}
