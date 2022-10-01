import { GridCoordinates, GridSize } from '@classes/generic/Grid/GridTypes';

import { InventoryItem } from './Inventory';

export class InventorySlot {
    id: number;
    item: InventoryItem;
    size: GridSize;
    coordinates: GridCoordinates[];
    isRotated = false;

    constructor(item: InventoryItem, coordinates: GridCoordinates[], isRotated = false) {
        this.id = item.id;
        this.item = item;
        this.size = item.size;
        this.coordinates = coordinates;

        if (isRotated) this.rotate();
    }

    rotate() {
        this.isRotated = !this.isRotated;
        this.size = [this.size[1], this.size[0]];
    }
}
