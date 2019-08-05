import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Experiment } from './experiment';
import { MeasurementType } from './measurementType';


@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class Measurement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    measurementTypeId: number;

    @Column()
    experimentId: number;

    @Column()
    group: number;

    @Column({ type: 'json' })
    measurementData: object;

    @ManyToOne(type => MeasurementType, measurementType => measurementType.measurements, {
        eager: true
    })
    public measurementType: MeasurementType;

    @ManyToOne(type => Experiment, experiment => experiment.measurements)
    public experiment: Experiment;
}
