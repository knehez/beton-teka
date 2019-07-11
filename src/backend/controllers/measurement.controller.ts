import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Measurement } from '../entities/measurement';

export default class MeasurementCtrl extends BaseCtrl {
    model = getRepository(Measurement);
}
