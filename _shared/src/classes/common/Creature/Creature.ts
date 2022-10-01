import { Events } from '@shared/classes/generic/Events/Events';
import { Structure } from '@shared/classes/generic/Structure/Structure';

import { Property } from '../Property/Property';
import { PropertyPreset, PropertyType } from '../Property/PropertyTypes';
import { createPropertiesStructure } from '../Property/PropertyUtils';
import { mapCreatureTypeToPreset } from './CreaturePresets';
import { CreatureType } from './CreatureTypes';

export class Creature {
    properties: Structure<PropertyType, Property>;
    propertiesEvents: Events = new Events();

    constructor(public type: CreatureType) {
        const [propertiesPresets] = mapCreatureTypeToPreset[type];
        this.properties = createPropertiesStructure(propertiesPresets, this.propertiesEvents);
    }
}
