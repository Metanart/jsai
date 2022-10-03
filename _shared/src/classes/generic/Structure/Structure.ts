import { CollectedEntities } from '@shared/types';
import { iterateFunction } from '@shared/utils/iterate-function';

import { Events } from '../Events/Events';

type StructureItemProperties = 'id' | 'type' | 'getEntity';

export type StructureItem = {
    [Key in StructureItemProperties]: any;
};

export class Structure<GenericItemType extends string, GenericItem extends StructureItem, GenericItemEntity> {
    private slots: { [key: string]: GenericItem | 'empty' } = {};

    constructor(
        private referenceClassName: string,
        slotsTypes: GenericItemType[],
        slotsItems: GenericItem[],
        public events: Events,
    ) {
        this.referenceClassName = referenceClassName;

        slotsTypes.map((type) => this.addSlot(type));

        if (slotsItems) this.setItems(slotsItems);
    }

    private checkIfItemAllowed(item: GenericItem) {
        return item.constructor.name === this.referenceClassName;
    }

    addSlot(type: GenericItemType) {
        if (this.slots[type]) return;
        this.slots[type] = 'empty';
        return type;
    }

    addSlots(types: GenericItemType[]) {
        return iterateFunction<GenericItemType>(types, this.addSlot.bind(this));
    }

    removeSlot(type: GenericItemType): GenericItemType | GenericItem | undefined {
        if (!this.slots[type]) return;

        if (this.slots[type]) {
            const slotItem = this.slots[type];

            delete this.slots[type];

            return slotItem !== 'empty' ? slotItem : type;
        }
    }

    removeSlots(types: GenericItemType[]): (GenericItemType | GenericItem)[] | undefined {
        return iterateFunction<GenericItemType>(types, this.removeSlot.bind(this));
    }

    setItem(item: GenericItem): GenericItem | undefined {
        if (!this.checkIfItemAllowed(item)) return;
        if (!this.slots[item.type]) return;
        if (this.slots[item.type] !== 'empty') return;

        this.slots[item.type] = item;

        return item;
    }

    setItems(items: GenericItem[]): GenericItem[] | undefined {
        return iterateFunction<GenericItem>(items, this.setItem.bind(this));
    }

    unsetItem(item: GenericItem): GenericItem | undefined {
        if (!this.checkIfItemAllowed(item)) return;

        const slotItem = this.slots[item.type];

        if (slotItem === 'empty') return;

        if (slotItem.id !== item.id) return;

        this.slots[item.type] = 'empty';

        return item;
    }

    unsetItems(items: GenericItem[]) {
        return iterateFunction<GenericItem>(items, this.unsetItem.bind(this));
    }

    cleanSlot(type: GenericItemType): GenericItem | GenericItemType | undefined {
        if (!this.slots[type]) return;

        const slotItem = this.slots[type];

        this.slots[type] === 'empty';

        if (slotItem === 'empty') return type;

        return slotItem;
    }

    cleanSlots(types: GenericItemType[]): GenericItemType[] | undefined {
        return iterateFunction<GenericItemType>(types, this.cleanSlot.bind(this));
    }

    getEntities(): CollectedEntities {
        return Object.keys(this.slots)
            .map((key: string) => {
                const currentItem = this.slots[key];

                if (currentItem !== 'empty' && currentItem['getEntity']) return currentItem.getEntity();
            })
            .filter(Boolean);
    }
}
