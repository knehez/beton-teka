import { Entity, Column, PrimaryGeneratedColumn, TreeParent, TreeChildren, Tree, JoinTable, ManyToMany } from 'typeorm';
import { FormField, Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';
import { Concrete } from './concrete';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
@Tree('materialized-path')
export class Category {

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

    @ManyToMany(type => Concrete, concrete => concrete.categories)
    concretes: Concrete[];

    @TreeParent()
    parent: Category;

    @TreeChildren()
    children: Category[];

    leaf = false;
}
