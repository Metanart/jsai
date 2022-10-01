import { BodyPartType } from '@classes/common/BodyPart/BodyPartTypes';
import { ClothingType } from '@classes/common/Clothing/ClothingTypes';
import { ResourceType } from '@classes/common/Resource/ResourceTypes';
import { ListItem } from '@classes/generic/Collection/CollectionTypes';
import { PropertyType } from '@classes/generic/Property/PropertyTypes';

export type FinderCounters = [number, number];

export type FindeQueryProperty = [PropertyType, number?, number?];

export type FinderQueryType = ResourceType | ClothingType | BodyPartType;

export type FinderResultsSortedByType = Record<string, ListItem[]>;

export type FinderQuery = {
    ids?: string[];
    properties?: FindeQueryProperty[];
    types?: FinderQueryType[];
    isExact?: boolean;
    findAll?: boolean;
};
