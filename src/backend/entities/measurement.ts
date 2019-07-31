import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
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

    measurementTypeId: number;

    experimentId: number;

    @Column({ type: 'json' })
    measurementData: object;

    @ManyToOne(type => MeasurementType, measurementType => measurementType.measurements, {
        eager: true
    })
    public measurementType: MeasurementType;

    @ManyToOne(type => Experiment, experiment => experiment.measurements)
    public experiment: Experiment;
}
