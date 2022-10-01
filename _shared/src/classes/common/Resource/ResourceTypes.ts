import { EventsCategory } from '@classes/generic/Events/EventsTypes';
import { GridSize } from '@classes/generic/Grid/GridTypes';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';

import { Resource } from './Resource';

export type ResourceType = 'skull' | 'bone' | 'meat' | 'brain' | 'apple' | 'cloth';

export type ResourcePreset = [GridSize, PropertyPreset[]];

export type ResourceFactory = (type: ResourceType, ownerId: number, parentEventsCategory: EventsCategory) => Resource;

export type ResourcesFactory = (
    types: ResourceType[],
    ownerId: number,
    parentEventsCategory: EventsCategory,
) => Resource[];
