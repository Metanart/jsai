import { CreatureEntity } from './classes/common/Creature/CreatureEntity';
import { PropertyEntity } from './classes/common/Property/PropertyEntity';

export type ClassName = 'Property' | 'Creature';

export type RouteName = 'properties' | 'creatures';

export type ProjectEntities = PropertyEntity | CreatureEntity;

export const RoutesList: RouteName[] = ['properties', 'creatures'];

export const mapClassToRouterName: Record<ClassName, RouteName> = {
    Property: 'properties',
    Creature: 'creatures',
};

export type CollectedEntity = { name: string; data: any };

export type CollectedEntities = CollectedEntity[];
