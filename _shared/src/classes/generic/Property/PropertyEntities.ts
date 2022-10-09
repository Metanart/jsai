import { ValueEntity } from '@generics/Value/ValueEntities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyType } from './PropertyTypes';

@Entity()
export class PropertyEntity extends ValueEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column({ type: 'text' })
    type!: PropertyType;
}
