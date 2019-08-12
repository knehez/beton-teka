import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Measurement } from './measurement';

@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class MeasurementFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastModifiedDate: Date;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    type: string;

    @Column({
        select: false
    })
    data: string;

    @ManyToOne(type => Measurement, measurement => measurement.files)
    measurement: Measurement;
}
