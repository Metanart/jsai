import { Resource } from './Resource';
import { mapResourceTypeToPreset } from './ResourcePresets';
import { ResourceType } from './ResourceTypes';
import { ResourceFactory, ResourcesFactory } from './ResourceTypes';

export const createResource: ResourceFactory = (
    type: ResourceType,
    ownerId: number,
    parentEventsCategory,
): Resource => {
    const [size, propertiesPresets] = mapResourceTypeToPreset[type];
    return new Resource(type, size, propertiesPresets, ownerId, parentEventsCategory);
};

export const createResources: ResourcesFactory = (
    types: ResourceType[],
    ownerId: number,
    parentEventsCategory,
): Resource[] => types.map((type: ResourceType) => createResource(type, ownerId, parentEventsCategory));
