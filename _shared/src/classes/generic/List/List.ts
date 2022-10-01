import { iterateFunction } from '@shared/utils/iterate-function';

export class List<GenericItem> {
    list: GenericItem[] = [];

    constructor(items?: GenericItem[]) {
        if (items?.length) this.addItems(items);
    }

    getItemIndex(requestedItem: GenericItem): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex((item) => item === requestedItem);
    }

    getItemsIndexes(items: GenericItem[], isExact = false): number[] | undefined {
        if (this.list.length === 0) return;

        const results = items.map((item) => this.getItemIndex(item)).filter((item) => item !== -1) as number[];

        if (isExact && results.length !== items.length) return;

        return results.length > 0 ? results : undefined;
    }

    addItem(item: GenericItem): GenericItem {
        this.list.push(item);
        return item;
    }

    addItems(items: GenericItem[]): GenericItem[] {
        return iterateFunction<GenericItem>(items, this.addItem.bind(this)) as GenericItem[];
    }

    addUniqueItem(item: GenericItem): GenericItem | undefined {
        if (this.getItemIndex(item) >= 0) return;
        return this.addItem(item);
    }

    addUniqueItems(items: GenericItem[]): GenericItem[] | undefined {
        return iterateFunction<GenericItem>(items, this.removeItemByIndex.bind(this));
    }

    removeItemByIndex(index: number): GenericItem | undefined {
        if (this.list.length === 0) return;
        const removedItem = this.list.splice(index, 1)[0];
        return removedItem;
    }

    removeItemsByIndexes(indexes: number[]): GenericItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateFunction<number, GenericItem>(indexes, this.removeItemByIndex.bind(this));
    }

    removeItem(item: GenericItem): GenericItem | undefined {
        if (this.list.length === 0) return;

        const itemIndex = this.getItemIndex(item);

        if (itemIndex === -1) return;

        return this.removeItemByIndex(itemIndex);
    }

    removeItems(items: GenericItem[]): GenericItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateFunction<GenericItem>(items, this.removeItem.bind(this));
    }
}
