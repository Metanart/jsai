import { List } from '@classes/generic/List/List';

type CollectionItemProperties = 'id' | 'ownerId';

export type CollectionItem = {
    [Key in CollectionItemProperties]: any;
};

export class Collection<GenericItem extends CollectionItem> extends List<GenericItem> {
    getItemByProperty(propertyValue: string | number, propertyName: CollectionItemProperties): GenericItem | undefined {
        const itemIndex = this.getItemIndexByProperty(propertyValue, propertyName);
        return itemIndex >= 0 ? this.list[itemIndex] : undefined;
    }

    getItemIndexByProperty(propertyValue: string | number, propertyName: CollectionItemProperties): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex((item) => item[propertyName] === propertyValue);
    }

    removeItemByProperty(
        propertyValue: string | number,
        propertyName: CollectionItemProperties,
    ): GenericItem | undefined {
        const itemIndex = this.getItemIndexByProperty(propertyValue, propertyName);
        return itemIndex >= 0 ? this.removeItemByIndex(itemIndex) : undefined;
    }

    override getItemIndex(requestedItem: GenericItem, propertyName?: CollectionItemProperties): number {
        if (this.list.length === 0) return -1;

        if (propertyName) return this.getItemIndexByProperty(requestedItem[propertyName], propertyName);

        return this.getItemIndexByProperty(requestedItem.id, 'id');
    }
}
