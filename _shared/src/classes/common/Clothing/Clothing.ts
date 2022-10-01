import { GridSize } from '@classes/generic/Grid/GridTypes';
import { Item } from '@classes/generic/Item/Item';
import { PropertyPreset } from '@classes/generic/Property/PropertyTypes';
import { Structure } from '@classes/generic/Structure/Structure';

import { Inventory } from '../Inventory/Inventory';
import { Resource } from '../Resource/Resource';
import { ResourceType } from '../Resource/ResourceTypes';
import { createResources } from '../Resource/ResourceUtils';
import { ClothingType } from './ClothingTypes';

export class Clothing extends Item<ClothingType> {
    inventory?: Inventory;
    structure: Structure<ResourceType, Resource>;

    constructor(
        type: ClothingType,
        size: GridSize,
        resourcesTypes: ResourceType[],
        propertiesPresets: PropertyPreset[],
        inventorySize?: GridSize,
    ) {
        super(type, size, propertiesPresets, type);

        this.structure = new Structure<ResourceType, Resource>(
            'Resource',
            resourcesTypes,
            createResources(resourcesTypes),
        );

        if (inventorySize) this.inventory = new Inventory(inventorySize);
    }
}
