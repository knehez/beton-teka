import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { MeasurementFile } from '../entities/measurementFile';

export default class MeasurementFileCtrl extends BaseCtrl {
    model = getRepository(MeasurementFile);

    // Insert
    insert = async (req, res) => {
        try {

            if (!req.params.measurementId) {
                throw new Error('Measurement ID has to be defined.');
            }

            const entity = this.model.create(req.body);
            entity['measurement'] = {
                id: req.params.measurementId
            };

            await this.model.save(entity);
            res.json({
                success: true,
                id: entity['id']
            });
        } catch (err) {
            return this.handleError(res);
        }
    }
}
