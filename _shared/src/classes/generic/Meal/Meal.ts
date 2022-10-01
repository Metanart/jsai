import { ResourceType } from '@classes/common/Resource/ResourceTypes';
import { Item } from '@classes/generic/Item/Item';

import { MealType } from './MealTypes';

export class Meal extends Item {
    ingridients: ResourceType[];

    constructor(type: MealType, ingridients: ResourceType[]) {
        super(type, type);
        this.ingridients = ingridients;
    }
}
