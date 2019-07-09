import { Initializer } from './initializer';
import { Category } from '../entities/category';
import { getRepository } from 'typeorm';

export default class CategoryInitializer extends Initializer {
    repository = getRepository(Category);

    constructor() {
        super();
    }


    async initialize() {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if (entityCount !== 0) {
            return;
        }

        const root = new Category();
        root.label = 'Betonok';
        await this.repository.save(root);

        const bcategory = new Category();
        bcategory.label = 'Alkotók, Jellemzők';
        bcategory.parent = root;
        await this.repository.save(bcategory);

        const ccategory = new Category();
        ccategory.label = 'Alkalmazási területek';
        ccategory.parent = root;
        await this.repository.save(ccategory);

        const c1category = new Category();
        c1category.label = 'Építőipari alkalmazási területek';
        c1category.parent = ccategory;
        await this.repository.save(c1category);

        const c2category = new Category();
        c2category.label = 'Iparművészeti alkalmazási területek';
        c2category.parent = ccategory;
        await this.repository.save(c2category);


        const c11category = new Category();
        c11category.label = 'Mélyépítés';
        c11category.parent = c1category;
        await this.repository.save(c11category);

        const c12category = new Category();
        c12category.label = 'Magasépítés';
        c12category.parent = c1category;
        await this.repository.save(c12category);


        const c111category = new Category();
        c111category.label = 'Közműépítés';
        c111category.parent = c11category;
        await this.repository.save(c111category);

        const c112category = new Category();
        c112category.label = 'Műtárgyépítés';
        c112category.parent = c11category;
        await this.repository.save(c112category);

        const c113category = new Category();
        c113category.label = 'Alépítmények';
        c113category.parent = c11category;
        await this.repository.save(c113category);

        const c121category = new Category();
        c121category.label = 'Födémek';
        c121category.parent = c12category;
        await this.repository.save(c121category);

        const c122category = new Category();
        c122category.label = 'Felmenő szerkezetek';
        c122category.parent = c12category;
        await this.repository.save(c122category);

        const c123category = new Category();
        c123category.label = 'Látványbeton szerkezetek';
        c123category.parent = c12category;
        await this.repository.save(c123category);

        const c124category = new Category();
        c124category.label = 'Burkolatok';
        c124category.parent = c12category;
        await this.repository.save(c124category);


        const c21category = new Category();
        c21category.label = 'Tárgykészítés';
        c21category.parent = c2category;
        await this.repository.save(c21category);

        const c22category = new Category();
        c22category.label = 'Kisbútor';
        c22category.parent = c2category;
        await this.repository.save(c22category);

        const c211category = new Category();
        c211category.label = 'Ékszer, Műtárgy';
        c211category.parent = c21category;
        await this.repository.save(c211category);

        const c212category = new Category();
        c212category.label = 'Használati tárgy';
        c212category.parent = c21category;
        await this.repository.save(c212category);

        const c221category = new Category();
        c221category.label = 'Beépített';
        c221category.parent = c22category;
        await this.repository.save(c221category);

        const c222category = new Category();
        c222category.label = 'Mobil';
        c222category.parent = c22category;
        await this.repository.save(c222category);

        const c223category = new Category();
        c223category.label = 'Speciális';
        c223category.parent = c22category;
        await this.repository.save(c223category);


        this.entities.push(root);
    }
}
