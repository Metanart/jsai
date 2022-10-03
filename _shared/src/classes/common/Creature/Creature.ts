import { CollectedEntities } from '@shared/types';

import { PropertiesStructure } from '../Property/PropertyTypes';
import { CreatureType } from './CreatureTypes';

export class Creature {
    constructor(public id: string, public type: CreatureType, public properties: PropertiesStructure) {}

    getEntities(): CollectedEntities {
        return [
            { name: this.constructor.name, data: { id: this.id, type: this.type } },
            ...this.properties.getEntities(),
        ];
    }
}
