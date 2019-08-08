import { getRepository, Like } from 'typeorm';
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
      return this.handleError(res, err.code);
    }
  }

  getAll = async (req, res) => {
    const params = {};
    const query = req.query || [];

    if (query.experimentName) {
      params['experimentName'] = Like(`%${query.experimentName}%`);
    }

    const data = await this.model.find(params);

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(404).json({
        success: false
      });
    }

    res.json({
      success: true,
      data
    });
  }
}
