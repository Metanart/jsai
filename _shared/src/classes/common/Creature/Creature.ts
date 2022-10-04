import { Column, Entity, PrimaryColumn } from 'typeorm';

import { PropertiesStructure } from '../Property/PropertyTypes';
import { CreatureType } from './CreatureTypes';

@Entity()
export class Creature {
    @PrimaryColumn({ type: 'blob' })
    id: string;

    @Column({ type: 'text' })
    type: CreatureType;

    constructor(id: string, type: CreatureType, public properties: PropertiesStructure) {
        this.id = id;
        this.type = type;
    }

    getEntities() {
        return [this, ...this.properties.getEntities()];
    }
}
