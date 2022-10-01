import { PropertiesMixin } from '@classes/mixins/PropertiesMixin';

import { Entity } from '../Entity/Entity';
import { EventsCategory } from '../Events/EventsTypes';
import { GridSize } from '../Grid/GridTypes';
import { PropertyPreset } from '../Property/PropertyTypes';

export class Item<ItemType> extends PropertiesMixin(Entity) {
    constructor(
        public type: ItemType,
        public size: GridSize,
        propertiesPresets: PropertyPreset[],
        ownerId: number,
        parentEventsCategory: EventsCategory,
    ) {
        super();
        this.setupPropertiesMixin(propertiesPresets, ownerId, parentEventsCategory);
    }
}
