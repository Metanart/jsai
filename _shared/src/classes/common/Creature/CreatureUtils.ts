import { Events } from '@generics/Events/Events';
import {
    createPropertiesFromEntities,
    createPropertiesStructureFromEntities,
    createPropertiesStructureFromPresets,
} from '@shared/classes/generic/Property/PropertyUtils';

import { Creature } from './Creature';
import { CreatureEntity } from './CreatureEntities';
import { mapCreatureTypeToPreset } from './CreaturePresets';
import { CreatureType } from './CreatureTypes';

export const createCreatureFromPreset = (type: CreatureType): Creature => {
    const { propertiesPresets } = mapCreatureTypeToPreset[type];
    const propertiesStructure = createPropertiesStructureFromPresets(propertiesPresets, new Events());
    return new Creature('', type, propertiesStructure);
};

export const createCreatureFromEntity = (creatureEntity: CreatureEntity): Creature => {
    const { id, type, properties } = creatureEntity;
    const propertiesStructure = createPropertiesStructureFromEntities(
        createPropertiesFromEntities(properties),
        new Events(),
    );
    return new Creature(id, type, propertiesStructure);
};
