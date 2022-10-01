import { ValueEntity } from '@shared/classes/generic/Value/ValueEntity';
import { Column, Entity } from 'typeorm';

import { PropertyType } from './PropertyTypes';

@Entity()
export class PropertyEntity extends ValueEntity {
    @Column({ type: 'text' })
    type!: PropertyType;
}
