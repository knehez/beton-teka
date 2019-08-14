import { MeasurementType } from '../entities/measurementType';
import { Initializer } from './initializer';
import { getRepository } from 'typeorm';

export default class MeasurementTypeInitializer extends Initializer {
    repository = getRepository(MeasurementType);

    async initialize() {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if (entityCount !== 0) {
            return;
        }

        const type1 = this.repository.create({
            id: 1,
            name: 'testsűrűség meghatározása'
        });
        await this.repository.save(type1);

        const type2 = this.repository.create({
            id: 2,
            name: 'nyomószilárdság meghatározása'
        });
        await this.repository.save(type2);

        const type3 = this.repository.create({
            id: 3,
            name: 'törőerő meghatározása'
        });
        await this.repository.save(type3);
    }
}
