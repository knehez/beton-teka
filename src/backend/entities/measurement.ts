import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';


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
    value: number;

    @Column()
    unit: number;

    @Column()
    note: string;

}
