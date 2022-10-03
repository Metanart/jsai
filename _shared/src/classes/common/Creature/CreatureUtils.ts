import { Events } from '@shared/classes/generic/Events/Events';
import { v4 } from 'uuid';

import { createPropertiesStructure } from '../Property/PropertyUtils';
import { Creature } from './Creature';
import { mapCreatureTypeToPreset } from './CreaturePresets';
import { CreatureType } from './CreatureTypes';

export const createCreatureFromPreset = (type: CreatureType): Creature => {
    const creatureId = v4();

    const { propertiesPresets } = mapCreatureTypeToPreset[type];
    const properties = createPropertiesStructure(new Events(), [], propertiesPresets, creatureId);

    return new Creature(creatureId, type, properties);
};
