import { BodyPart } from '@classes/common/BodyPart/BodyPart';
import { Clothing } from '@classes/common/Clothing/Clothing';
import { Collection } from '@classes/generic/Collection/Collection';
import { List } from '@classes/generic/Collection/Collection';
import { CollectionComplexItem, CollectionItem } from '@classes/generic/Collection/CollectionTypes';
import { Counter } from '@classes/generic/Counter/Counter';
import { Property } from '@classes/generic/Property/Property';
import { Timer } from '@classes/generic/Timer/Timer';

import {
    FindeQueryProperty,
    FinderCounters,
    FinderQuery,
    FinderQueryType,
    FinderResultsSortedByType,
} from './FinderTypes';
import { FINDER_DEFAULT_COUNTER, FINDER_DEFAULT_DEPTH } from './FinderUtils';

export class Finder {
    query: FinderQuery = {};
    collections: Collection[] = [];
    counter: Counter;
    depth: Counter;
    timer = new Timer();
    results = new List<CollectionItem>('Finder results');
    processedCollections: Collection[][] = [];
    processedItems: CollectionItem[][] = [];

    constructor(
        query?: FinderQuery,
        collections?: Collection[],
        counters = [FINDER_DEFAULT_COUNTER, FINDER_DEFAULT_DEPTH] as FinderCounters,
    ) {
        const [counterValue, depthValue] = counters;

        this.counter = new Counter(counterValue);
        this.depth = new Counter(depthValue);

        if (collections) this.collections = collections;
        if (query) this.query = query;

        this.findItems();
    }

    setCollections(collections: Collection[]) {
        this.collections = collections;
        return this;
    }

    setQuery(query: FinderQuery) {
        this.query = query;
        return this;
    }

    checkIdMatchesQuery(id: string) {
        if (!this.query) return false;

        if (!this.query.ids && this.query.isExact) return true;

        if (this.query.ids?.length) {
            return Boolean(this.query.ids.includes(id));
        } else {
            return false;
        }
    }

    checkTypeMatchesQuery(type: FinderQueryType): boolean {
        if (!this.query.types && this.query.isExact) return true;

        if (this.query.types?.length) {
            return Boolean(this.query.types.includes(type));
        } else {
            return false;
        }
    }

    checkPropertiesMatchesQuery(givenProperties: Property[]): boolean {
        let requestedProperties: FindeQueryProperty[];

        if (!this.query.properties && this.query.isExact) return true;

        if (this.query.properties?.length) {
            requestedProperties = this.query.properties;
        } else {
            return false;
        }

        const matchedProperties: Property[] = [];

        givenProperties.map((itemProperty: Property) => {
            requestedProperties.map((requestedProperty: FindeQueryProperty) => {
                const [requestedType, requestedMinValue = -1, requestedMaxValue = -1] = requestedProperty;

                if (itemProperty.type !== requestedType) return;

                if (requestedMinValue >= 0 && requestedMaxValue >= 0) {
                    if (itemProperty.value >= requestedMinValue && itemProperty.value <= requestedMaxValue) {
                        matchedProperties.push(itemProperty);
                        return;
                    } else return;
                }

                if (requestedMinValue >= 0) {
                    if (itemProperty.value >= requestedMinValue) {
                        matchedProperties.push(itemProperty);
                        return;
                    } else return;
                }

                matchedProperties.push(itemProperty);
            });
        });

        if (this.query.isExact) {
            return matchedProperties.length === requestedProperties.length;
        }

        return Boolean(matchedProperties.length);
    }

    checkQueryHasAtLeastOneParam() {
        if (!this.query) return false;

        return Boolean(this.query.ids) || Boolean(this.query.properties) || Boolean(this.query.types);
    }

    checkMatchesQuery(item: CollectionItem) {
        if (!this.checkQueryHasAtLeastOneParam) return;

        let isMatchesProperties = item.properties && this.checkPropertiesMatchesQuery(item.properties);
        let isMatchesTypes = this.checkTypeMatchesQuery(item.type as FinderQueryType);
        let isMatchesIds = this.checkIdMatchesQuery(item.id);

        if (this.query.isExact) {
            return isMatchesProperties && isMatchesTypes && isMatchesIds;
        }

        return isMatchesProperties || isMatchesTypes || isMatchesIds;
    }

    checkItemHasCollections(item: CollectionItem) {
        return item instanceof Clothing || item instanceof BodyPart;
    }

    getCollectionsFromItem(item: CollectionItem): Collection[] {
        if (!this.checkItemHasCollections(item)) return [];

        return (item as CollectionComplexItem).getCollections();
    }

    processCollection(collection: Collection): Collection[] {
        if (collection.isEmpty) return [];
        if (this.counter.isMaximumReached) return [];

        this.counter.increase();

        const nestedCollections: Collection[] = [];
        this.processedCollections[this.depth.step].push(collection);

        collection.items.map((item: CollectionItem) => {
            this.processedItems[this.depth.step].push(item);

            if (this.query.findAll || this.checkMatchesQuery(item)) this.results.addItem(item);

            const itemCollections = this.getCollectionsFromItem(item);
            if (itemCollections.length) nestedCollections.push(...itemCollections);
        });

        return nestedCollections;
    }

    processCollections(collections = this.collections) {
        if (!collections.length) return;
        if (this.depth.isMaximumReached) return;

        if (!this.processedCollections[this.depth.step]) {
            this.processedCollections[this.depth.step] = [];
        }

        if (!this.processedItems[this.depth.step]) {
            this.processedItems[this.depth.step] = [];
        }

        const nextDepthCollections: Collection[] = [];

        collections.map((collection: Collection) => {
            const nestedCollections = this.processCollection(collection);
            if (nestedCollections.length) nextDepthCollections.push(...nestedCollections);
        });

        if (!nextDepthCollections.length) return;

        this.depth.increase();
        this.processCollections(nextDepthCollections);
    }

    getResultsSortedByTypes() {
        const results: FinderResultsSortedByType = {};

        this.results.items.map((item) => {
            if (!results[item.type]) results[item.type] = [];

            results[item.type].push(item);
        });

        return results;
    }

    findItems(collections = this.collections) {
        this.timer.run();

        this.processCollections(this.collections);

        this.timer.finish();

        return this;
    }
}
