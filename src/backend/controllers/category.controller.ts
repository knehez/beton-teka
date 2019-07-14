import { getTreeRepository, getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Category } from '../entities/category';

export default class CategoryCtrl extends BaseCtrl {
    model = getTreeRepository(Category);

    getAll = async (req, res) => {
        try {
            const trees = await this.model.findTrees();
            return res.json({
                success: true,
                data: trees[0]
            });
        } catch (err) {
            return super.handleError(res);
        }
    }

    get = async (req, res) => {
        try {
            const category = await getRepository(Category)
                .findOne({
                    relations: ['concretes'],
                    where: {
                        id: req.params.id
                    }
                });

            if (!category) {
                return res.status(404).json({ success: false });
            }

            return res.json({
                success: true,
                data: category
            });
        } catch (err) {
            console.log(err);
            return super.handleError(res);
        }
    }

    insert = async (req, res) => {
        try {
            const entity = this.model.create(req.body);
            const rootCategories = await this.model.findRoots();
            const root = rootCategories[0];

            if (!req.body.parent || !req.body.parent.id) {
                entity['parent'] = root;
            }

            const result = await this.model.save(entity);
            return res.json({
                success: true,
                id: result['id']
            });
        } catch (err) {
            return super.handleError(res);
        }
    }

    update = async (req, res) => {
        try {
            const entity = this.model.create(req.body);
            const rootCategories = await this.model.findRoots();
            const root = rootCategories[0];

            if (entity['id'] !== root.id
                && (!req.body.parent || !req.body.parent.id)) {
                entity['parent'] = root;
            }

            const result = await this.model.save(entity);
            return res.json({
                success: true,
                id: result['id']
            });
        } catch (err) {
            return super.handleError(res);
        }
    }

    delete = async (req, res) => {
        try {
            const entity = await this.model.findOne(req.params.id);
            const rootCategories = await this.model.findRoots();
            const root = rootCategories[0];

            if (entity['id'] === root.id) {
                return this.handleError(res, 'Can not delete root category.');
            }

            await this.model.remove(entity);

            res.json({
                success: true
            });
        } catch (err) {
            return this.handleError(res);
        }
    }
}
