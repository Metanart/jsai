import { EventsCategory } from '@classes/generic/Events/EventsTypes';
import { GridSize } from '@classes/generic/Grid/GridTypes';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';

import { ResourceType } from '../Resource/ResourceTypes';
import { BodyPart } from './BodyPart';

export type BodyPartType = 'head' | 'torso' | 'rightArm' | 'leftArm' | 'leftLeg' | 'rightLeg';

export type BodyPartPreset = [GridSize, PropertyPreset[], ResourceType[]];

export type BodyPartFactory = (type: BodyPartType, ownerId: number, parentEventsCategory: EventsCategory) => BodyPart;

export type BodyPartsFactory = (
    types: BodyPartType[],
    ownerId: number,
    parentEventsCategory: EventsCategory,
) => BodyPart[];
