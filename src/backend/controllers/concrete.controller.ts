import { getRepository, FindManyOptions, Like } from 'typeorm';
import BaseCtrl from './base.controller';
import { Concrete } from '../entities/concrete';

export default class ConcreteCtrl extends BaseCtrl {
    model = getRepository(Concrete);

    getAll = async (req, res) => {
        const params = {};
        const query = req.query || [];

        if (query.label) {
            params['label'] = Like(`%${query.label}%`);
        }

        const data = await this.model.find(params);

        if (!data) {
            return res.status(404).json({
                success: false
            });
        }

        res.json({
            success: true,
            data
        });
    }

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
