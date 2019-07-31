import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { FormField, Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Measurement } from './measurement';


@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Experiment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    experimentName: string;

    @Column()
    cups: number;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column({ type : 'json'})
    adds: Object;

    @OneToMany(type => Measurement, measurement => measurement.experiment)
    measurements: Measurement[];
}
