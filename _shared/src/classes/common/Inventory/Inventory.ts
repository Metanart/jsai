import { Collection } from '@classes/generic/Collection/Collection';
import { Entity } from '@classes/generic/Entity/Entity';
import { Grid } from '@classes/generic/Grid/Grid';
import { GridCoordinates, GridSize } from '@classes/generic/Grid/GridTypes';
import { iterateFunction } from '@utils/iterate-function';

import { InventorySlot } from './InventorySlot';

export type InventoryItem = {
    id: number;
    size: GridSize;
};

export class Inventory extends Entity {
    grid: Grid;
    slots = new Collection<InventorySlot>();

    constructor(size: GridSize) {
        super();

        this.grid = new Grid(size);
    }

    storeItem(item: InventoryItem): InventorySlot | false {
        const freeCoordinates = this.getFreeCoordinates(item.size);

        if (!freeCoordinates) return false;

        const newSlot = new InventorySlot(item, freeCoordinates.list, freeCoordinates.isRotated);

        this.grid.updateCellsByCoordinates(newSlot.coordinates, 1);

        return this.slots.addItem(newSlot);
    }

    storeItems(items: InventoryItem[]): InventorySlot[] | false {
        return iterateFunction<InventoryItem, InventorySlot>(items, this.storeItem.bind(this));
    }

    removeSlot(slot: InventorySlot): InventorySlot | false {
        const slotIndex = this.slots.getItemIndex(slot);

        if (!slotIndex) return false;

        this.grid.updateCellsByCoordinates(this.slots.items[slotIndex].coordinates, 0);

        return this.slots.removeItemByIndex(slotIndex);
    }

    removeSlots(items: InventorySlot[]): InventorySlot[] | false {
        return iterateFunction<InventorySlot>(items, this.removeSlots.bind(this));
    }

    getFreeCoordinates(itemSize: GridSize): { list: GridCoordinates[]; isRotated: boolean } | false {
        let freeCoordinatesList;

        const [itemHeight, itemWidth] = itemSize;

        freeCoordinatesList = this.grid.getFreeCoordinates(itemSize);

        if (freeCoordinatesList) {
            return { list: freeCoordinatesList, isRotated: false };
        }

        freeCoordinatesList = this.grid.getFreeCoordinates([itemWidth, itemHeight]);

        if (freeCoordinatesList) {
            return { list: freeCoordinatesList, isRotated: true };
        }

        return false;
    }
}
