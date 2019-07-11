import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Experiment } from '../entities/experiment';

export default class ExperimentCtrl extends BaseCtrl {
    model = getRepository(Experiment);
}
