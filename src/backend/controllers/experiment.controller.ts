import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Experiment } from '../entities/experiment';

export default class ExperimentCtrl extends BaseCtrl {
    model = getRepository(Experiment);

    insert = async (req, res) => {
        try {
          const entity = this.model.create(req.body);

          for (const measurement of entity['measurements']) {
              measurement.measurementData = { data: [] };
          }

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
