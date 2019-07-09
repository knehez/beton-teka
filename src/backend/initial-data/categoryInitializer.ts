import { Initializer } from './initializer';
import { Category } from '../entities/category';
import { getRepository } from 'typeorm';

export default class CategoryInitializer extends Initializer {
    repository = getRepository(Category);

    constructor () {
        super();

        const root = new Category();
        root.label = 'Betonok';

        this.entities.push(root);
    }
}
