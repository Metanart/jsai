import { Events } from '@classes/generic/Events/Events';
import { GridSize } from '@classes/generic/Grid/GridTypes';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';

import { ResourceType } from '../Resource/ResourceTypes';
import { Clothing } from './Clothing';

export type ClothingType =
    | 'bodyJacket'
    | 'pants'
    | 'bodyShirt'
    | 'bodyVest'
    | 'feet'
    | 'eyewear'
    | 'gloves'
    | 'backpack'
    | 'headgear'
    | 'hips';

export type ClothingPreset = [GridSize, ResourceType[], PropertyPreset[], GridSize?];

export type ClothingFactory = (type: ClothingType, events: Events) => Clothing;

export type ClothingsFactory = (types: ClothingType[], events: Events) => Clothing[];
