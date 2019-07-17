import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Experiment } from './experiment';


@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class Measurement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    standard: string;

    @ManyToOne(type => Experiment, experiment => experiment.measurements)
    experiment: Experiment;
}
