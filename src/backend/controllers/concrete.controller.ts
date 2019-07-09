import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Concrete } from '../entities/concrete';

export default class ConcreteCtrl extends BaseCtrl {
    model = getRepository(Concrete);
}
