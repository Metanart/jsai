import { EventsCategory } from '@classes/generic/Events/EventsTypes';

import { BodyPart } from './BodyPart';
import { mapBodyPartTypeToPreset } from './BodyPartPresets';
import { BodyPartType } from './BodyPartTypes';
import { BodyPartFactory, BodyPartsFactory } from './BodyPartTypes';

export const createBodyPart: BodyPartFactory = (type, ownerId, parentEventsCategory) => {
    const [size, propertiesPresets, resourceTypes] = mapBodyPartTypeToPreset[type];
    return new BodyPart(type, size, propertiesPresets, resourceTypes, ownerId, parentEventsCategory);
};

export const createBodyParts: BodyPartsFactory = (types, ownerId, parentEventsCategory) =>
    types.map((type: BodyPartType) => createBodyPart(type, ownerId, parentEventsCategory));
