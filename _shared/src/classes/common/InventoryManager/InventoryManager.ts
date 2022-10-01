import { Collection } from '@classes/generic/Collection/Collection';
import { Entity } from '@classes/generic/Entity/Entity';
import { iterateFunction } from '@utils/iterate-function';

import { Inventory, InventoryItem } from '../Inventory/Inventory';
import { InventorySlot } from '../Inventory/InventorySlot';

export class InventoryManager extends Entity {
    list = new Collection<Inventory>();

    storeItem(item: InventoryItem): InventoryItem | false {
        const inventories = this.list.items;

        for (let index = 0; index < inventories.length; index++) {
            const storedItem = inventories[index].storeItem(item);
            if (storedItem) return storedItem;
        }

        return false;
    }

    storeItems(items: InventoryItem[]): InventoryItem[] | false {
        return iterateFunction<InventoryItem>(items, this.storeItem.bind(this));
    }

    removeSlot(slot: InventorySlot): InventorySlot | false {
        const inventories = this.list.items;

        for (let index = 0; index < inventories.length; index++) {
            const removedSlot = inventories[index].removeSlot(slot);
            if (removedSlot) return removedSlot;
        }

        return false;
    }

    removeSlots(slots: InventorySlot[]): InventorySlot[] | false {
        return iterateFunction<InventorySlot>(slots, this.removeSlot.bind(this));
    }

    addInventory(inventory: Inventory): Inventory | false {
        return this.list.addUniqueItem(inventory);
    }

    removeInventory(inventory: Inventory): Inventory | false {
        return this.list.removeItem(inventory);
    }
}
