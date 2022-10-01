import { BodyPartType } from '@classes/common/BodyPart/BodyPartTypes';
import { Director } from '@classes/generic/Director/Director';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';

import { ClothingType } from '../Clothing/ClothingTypes';
import { Creature } from './Creature';

export type CreatureType = 'human';

export type CreaturePreset = [PropertyPreset[], BodyPartType[]];

export type CreatureFactory = (type: CreatureType, director: Director) => Creature;

export type CreaturesFactory = (types: CreatureType[], director: Director) => Creature[];
