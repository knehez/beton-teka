import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { FormField, Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Category } from './category';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Concrete {

    @FormField({
        className: 'TextboxInput',
        header: 'Id',
        required: true,
        type: 'number',
        order: 1,
        hidden: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @FormField({
        className: 'TextboxInput',
        header: 'Name',
        required: true,
        order: 2
    })
    @Column({
        name: 'name'
    })
    label: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Description',
        required: true,
        order: 3
    })
    @Column()
    description: string;

    @Column('json')
    properties: object;

    @ManyToMany(type => Category, category => category.concretes, {
        eager: true, cascade: true
    })
    @JoinTable()
    categories: Category[];
}
