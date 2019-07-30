import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { MeasurementType } from '../entities/measurementType';

export default class MeasurementTypeCtrl extends BaseCtrl {
    model = getRepository(MeasurementType);
}
