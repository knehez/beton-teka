import { MeasurementType } from '../entities/measurementType';
import { Initializer } from './initializer';
import { getRepository } from 'typeorm';



export default class MeasurementTypeInitializer extends Initializer {
    repository = getRepository(MeasurementType);

    measurementTypes = [
       'testsűrűség meghatározása',
       'nyomószilárdság meghatározása',
       'törőerő meghatározása'
    ];


    async initialize() {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if (entityCount !== 0) {
            return;
        }

        for (const measurementType of this.measurementTypes) {
            const type = new MeasurementType();
            type.name = measurementType;
            await this.repository.save(type);
        }
    }
}
