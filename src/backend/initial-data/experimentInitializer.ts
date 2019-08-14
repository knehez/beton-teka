import { Initializer } from './initializer';
import { getRepository } from 'typeorm';
import { Experiment } from '../entities/experiment';
import { Measurement } from '../entities/measurement';
import { MeasurementFile } from '../entities/measurementFile';

export default class ExperimentInitializer extends Initializer {

    experimentRepository = getRepository(Experiment);
    measurementRepository = getRepository(Measurement);
    measurementFileRepository = getRepository(MeasurementFile);

    async initialize() {
        const experimentCount = await this.experimentRepository.createQueryBuilder().getCount();
        const measurementCount = await this.measurementRepository.createQueryBuilder().getCount();
        const measurementFileCount = await this.measurementFileRepository.createQueryBuilder().getCount();

        if (experimentCount !== 0 || measurementCount !== 0 || measurementFileCount !== 0) {
            return;
        }

        const file1 = this.measurementFileRepository.create({
            id: 1,
            lastModifiedDate: new Date('2019-08-14 08:46:05'),
            name: 'teszt.txt',
            size: 16,
            type: 'text/plain',
            data: 'data:text/plain;base64,dGVzenR0ZXN6dHRlc3p0Cg=='
        });

        const file2 = this.measurementFileRepository.create({
            id: 2,
            lastModifiedDate: new Date('2019-08-14 08:50:36'),
            name: 'teszt2.txt',
            size: 26,
            type: 'text/plain',
            data: 'data:text/plain;base64,dGVzenR0ZXN6dHRlc3p0CnRlc3p0dGVzenQ='
        });

        await this.measurementFileRepository.save(file1);
        await this.measurementFileRepository.save(file2);

        const experiment1 = this.experimentRepository.create({
            id: 1,
            experimentName: 'B215',
            description: `
                testsűrűség meghatározása (MSZ EN 12390-7:2009)
                Minta kora: 115 nap
                Próbatest víztelítettségi állapota: átadáskori állapot
                Térfogatmeghatározás módszere: tényleges méretek felhasználásával végzett számítások`,
            cups: 3,
            date: new Date('2016-01-18'),
            adds: [
                {
                    name: 'cement',
                    quantity: 480,
                    unit: 'kg'
                },
                {
                    name: 'homokos kavics',
                    quantity: 1611,
                    unit: 'kg'
                },
                {
                    name: 'keverővíz',
                    quantity: 215,
                    unit: 'kg'
                }
            ],
            measurements: [
                {
                    id: 1,
                    measurementTypeId: 1,
                    group: 1,
                    files: [file1],
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2342,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 8074,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 150.9,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 152.4,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 149.9,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 2,
                    measurementTypeId: 2,
                    group: 1,
                    files: [file2],
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 56.9,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 3,
                    measurementTypeId: 3,
                    group: 1,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1309.1,
                                unit: 'kN'
                            },
                        ]
                    }
                },
                {
                    id: 4,
                    measurementTypeId: 1,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2334,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 8025,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 151.3,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 151.3,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 150.2,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 5,
                    measurementTypeId: 2,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 62.6,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 6,
                    measurementTypeId: 3,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1434.1,
                                unit: 'kN'
                            },
                        ]
                    }
                },
                {
                    id: 7,
                    measurementTypeId: 1,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2330,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 7980,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 150.3,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 151.3,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 150.6,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 8,
                    measurementTypeId: 2,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 57.4,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 9,
                    measurementTypeId: 3,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1305.7,
                                unit: 'kN'
                            },
                        ]
                    }
                }
            ]
        });

        await this.experimentRepository.save(experiment1);

        const experiment2 = this.experimentRepository.create({
            id: 2,
            experimentName: 'B216',
            description: `
                testsűrűség meghatározása (MSZ EN 12390-7:2009)
                Minta kora: 115 nap
                Próbatest víztelítettségi állapota: átadáskori állapot
                Térfogatmeghatározás módszere: tényleges méretek felhasználásával végzett számítások`,
            cups: 3,
            date: new Date('2016-01-18'),
            adds: [
                {
                    name: 'cement',
                    quantity: 430,
                    unit: 'kg'
                },
                {
                    name: 'homokos kavics',
                    quantity: 1654,
                    unit: 'kg'
                },
                {
                    name: 'keverővíz',
                    quantity: 215,
                    unit: 'kg'
                }
            ],
            measurements: [
                {
                    id: 10,
                    measurementTypeId: 1,
                    group: 1,
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2369,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 8012,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 150.6,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 149.9,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 149.8,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 11,
                    measurementTypeId: 2,
                    group: 1,
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 62.4,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 12,
                    measurementTypeId: 3,
                    group: 1,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1407.9,
                                unit: 'kN'
                            },
                        ]
                    }
                },
                {
                    id: 13,
                    measurementTypeId: 1,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2372,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 8114,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 150.5,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 151,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 150.5,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 14,
                    measurementTypeId: 2,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 64.4,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 15,
                    measurementTypeId: 3,
                    group: 2,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1463.8,
                                unit: 'kN'
                            },
                        ]
                    }
                },
                {
                    id: 16,
                    measurementTypeId: 1,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'testsűrűség',
                                value: 2390,
                                unit: 'kg/m3'
                            },
                            {
                                name: 'tömeg',
                                value: 8169,
                                unit: 'g'
                            },
                            {
                                name: 'szélesség',
                                value: 150.8,
                                unit: 'mm'
                            },
                            {
                                name: 'hosszúság',
                                value: 151.3,
                                unit: 'mm'
                            },
                            {
                                name: 'magasság',
                                value: 149.8,
                                unit: 'mm'
                            },
                        ]
                    }
                },
                {
                    id: 17,
                    measurementTypeId: 2,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'nyomószilárdság',
                                value: 62.1,
                                unit: 'N/mm2'
                            },
                        ]
                    }
                },
                {
                    id: 18,
                    measurementTypeId: 3,
                    group: 3,
                    measurementData: {
                        data: [
                            {
                                name: 'törőerő',
                                value: 1416.2,
                                unit: 'kN'
                            },
                        ]
                    }
                }
            ]
        });

        await this.experimentRepository.save(experiment2);
    }
}
