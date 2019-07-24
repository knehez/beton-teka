import { getRepository, FindManyOptions } from 'typeorm';
import BaseCtrl from './base.controller';
import { Concrete } from '../entities/concrete';

export default class ConcreteCtrl extends BaseCtrl {
    model = getRepository(Concrete);

    getAllNames = async (req, res) => {
        const names = await this.model.find({ select: (['label']) });

        const result = names.map(e => e.label);

        res.json(result);
    }

    getAllData = async (req, res) => {
        const data = await this.model.find({ select: (['id', 'label', 'description', 'properties']) });

        const result = data.map(e => e);

        res.json(result);
    }
}
