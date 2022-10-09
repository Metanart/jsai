import { Events } from '@generics/Events/Events';
import { Property } from '@generics/Property/Property';
import { Structure } from '@generics/Structure/Structure';
import { PropertyType } from '@shared/classes/generic/Property/PropertyTypes';
import { getPreparedEntity } from '@shared/utils/get-prepared-entity';

import { CreatureEntity, CreaturePropertyEntity } from './CreatureEntities';
import { CreatureType } from './CreatureTypes';

export class Creature {
    events = new Events();

    constructor(public id: string, public type: CreatureType, public properties: Structure<PropertyType, Property>) {}

    toEntity(): CreatureEntity {
        return getPreparedEntity(this.id, {
            type: this.type,
            properties: this.properties.getEntities(),
        }) as CreatureEntity;
    }
}
