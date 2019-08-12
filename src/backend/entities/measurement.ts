import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Experiment } from './experiment';
import { MeasurementType } from './measurementType';
import { MeasurementFile } from './measurementFile';


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

    @OneToMany(type => MeasurementFile, measurementFile => measurementFile.measurement, {
        eager: true
    })
    files: MeasurementFile;
}
