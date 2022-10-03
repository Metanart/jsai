import { createCreatureFromPreset } from '@shared/classes/common/Creature/CreatureUtils';

import { prepareEntitiesForServer } from './utils/prepare-entities-for-server';

const creature = createCreatureFromPreset('human');

console.log(prepareEntitiesForServer(creature.getEntities()));
