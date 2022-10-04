import { createPropertiesStructure } from '@common/Property/PropertyUtils';
import { Events } from '@generic/Events/Events';
import { v4 } from 'uuid';

import { Creature } from './Creature';
import { mapCreatureTypeToPreset } from './CreaturePresets';
import { CreatureType } from './CreatureTypes';

export const createCreatureFromPreset = (type: CreatureType): Creature => {
    const creatureId = v4();

    const { propertiesPresets } = mapCreatureTypeToPreset[type];
    const properties = createPropertiesStructure([], propertiesPresets, new Events(), creatureId);

    return new Creature(creatureId, type, properties);
};
