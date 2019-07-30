import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';


@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class MeasurementType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
