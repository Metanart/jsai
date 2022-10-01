import { FinderResultsSortedByType } from '@classes/common/Finder/FinderTypes';
import { ResourceType } from '@classes/common/Resource/ResourceTypes';
import { Entity } from '@classes/generic/Entity/Entity';

import { RecipeType } from './RecipeTypes';

export class Recipe extends Entity {
    availableResources?: FinderResultsSortedByType;
    requredResourceTypes: ResourceType[];
    counter = 0;
    isAvailable = false;

    constructor(
        type: RecipeType,
        requredResourceTypes: ResourceType[],
        availableResources?: FinderResultsSortedByType,
    ) {
        super(type, type);

        if (availableResources) this.availableResources = availableResources;
        this.requredResourceTypes = requredResourceTypes;

        this.calculateAvailability();
    }

    updateAvailability(amount: number) {
        this.counter = this.counter + amount;
        this.isAvailable = this.counter > 0;
    }

    calculateAvailability() {
        if (!this.availableResources) return;

        let amountOfMatchedTypes = 0;
        let maxAvailableCounter = 0;

        this.requredResourceTypes.map((resourceType) => {
            const currentResourceLength = this.availableResources![resourceType]?.length;

            if (currentResourceLength) {
                if (maxAvailableCounter === 0) {
                    maxAvailableCounter = currentResourceLength;
                } else if (maxAvailableCounter > currentResourceLength) maxAvailableCounter = currentResourceLength;

                amountOfMatchedTypes++;
            }
        });

        if (amountOfMatchedTypes !== this.requredResourceTypes.length) return;

        this.updateAvailability(maxAvailableCounter);
    }

    craft() {}
}
