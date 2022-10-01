import { Events } from '@shared/classes/generic/Events/Events';
import { Structure } from '@shared/classes/generic/Structure/Structure';
import { ValueNumber } from '@shared/classes/generic/Value/Value';

import { Property } from './Property';
import { PropertyEntity } from './PropertyEntity';
import { PropertyData, PropertyPreset, PropertyType } from './PropertyTypes';

export const createProperty = (type: PropertyType, value: ValueNumber, events: Events): Property =>
    new Property(type, value, events);

export const createProperties = (presets: PropertyPreset[], events: Events): Property[] => {
    return presets.map((preset: PropertyPreset) => {
        const [type, value] = preset;
        return createProperty(type, value, events);
    });
};

export const createPropertyFromEntity = (entity: PropertyEntity, events: Events): Property => {
    // @ts-ignore
    return new Property().applyEntityData(entity).setEvents(events);
};

export const createPropertiesStructure = (
    presets: PropertyPreset[],
    events: Events,
): Structure<PropertyType, Property> => {
    let types: PropertyType[] = [];
    let items: Property[] = [];

    items = presets.map((preset) => {
        const [type, value] = preset;
        types.push(type);

        return createProperty(type, value, events);
    });

    return new Structure<PropertyType, Property>('Property', types, items, events);
};
