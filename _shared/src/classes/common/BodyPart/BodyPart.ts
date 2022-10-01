import { EventsCategory } from '@classes/generic/Events/EventsTypes';
import { GridSize } from '@classes/generic/Grid/GridTypes';
import { Item } from '@classes/generic/Item/Item';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';
import { Structure } from '@classes/generic/Structure/Structure';

import { Resource } from '../Resource/Resource';
import { ResourceType } from '../Resource/ResourceTypes';
import { createResources } from '../Resource/ResourceUtils';
import { BodyPartType } from './BodyPartTypes';

export class BodyPart extends Item<BodyPartType> {
    composition: Structure<ResourceType, Resource>;

    constructor(
        type: BodyPartType,
        size: GridSize,
        propertiesPresets: PropertyPreset[],
        resourcesTypes: ResourceType[],
        ownerId: number,
        parentEventsCategory: EventsCategory,
    ) {
        super(type, size, propertiesPresets, ownerId, parentEventsCategory);

        this.composition = new Structure<ResourceType, Resource>(
            'Resource',
            resourcesTypes,
            createResources(resourcesTypes, ownerId, [...parentEventsCategory, 'composition', 'resource']),
            ownerId,
            [...parentEventsCategory, 'composition'],
        );
    }
}
