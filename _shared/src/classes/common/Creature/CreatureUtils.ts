import { Creature } from './Creature';
import { mapCreatureTypeToPreset } from './CreaturePresets';
import { CreatureFactory, CreaturesFactory } from './CreatureTypes';

export const createCreature: CreatureFactory = (type, director): Creature =>
    new Creature(type, director, ...mapCreatureTypeToPreset[type]);

export const createCreatures: CreaturesFactory = (types, director) =>
    types.map((type) => createCreature(type, director));
