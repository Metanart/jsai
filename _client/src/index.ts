import { restApi } from '@classes/RestAPI/RestAPI';
import { createCreatureFromPreset } from '@shared/common/Creature/CreatureUtils';

const creature = createCreatureFromPreset('human');

const creatureEntites = creature.getEntities();

restApi.setEntities([creature]).send('POST');

console.log(restApi.results.Creature?.then((data) => console.log(data)));
