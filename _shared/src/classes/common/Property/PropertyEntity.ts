import { ValueEntity } from '@shared/classes/generic/Value/ValueEntity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { PropertyType } from './PropertyTypes';

@Entity()
export class PropertyEntity extends ValueEntity {
    @PrimaryColumn('blob')
    id!: string;

    @Column('blob')
    parentId!: string;

    @Column({ type: 'text' })
    type!: PropertyType;
}
