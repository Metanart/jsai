import { Events } from '@generic/Events/Events';
import { Structure } from '@generic/Structure/Structure';
import { v4 } from 'uuid';

import { Property } from './Property';
import { PropertiesStructure, PropertyPreset, PropertyType } from './PropertyTypes';

export const createProperty = (type: PropertyType, value: number, parentId: string, events?: Events) =>
    new Property(v4(), type, value, parentId, events);

export const createPropertyFromPreset = (preset: PropertyPreset, parentId: string, events?: Events) =>
    new Property(v4(), preset.type, preset.value, parentId, events);

export const createPropertiesFromPresets = (presets: PropertyPreset[], parentId: string, events?: Events) =>
    presets.map((preset) => createPropertyFromPreset(preset, parentId, events));

export const createPropertyFromEntity = (entity: Property, events?: Events): Property => {
    const { id, parentId, type, value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue } = entity;
    return new Property(id, type, value, parentId, events, maxValue, minValue, baseValue, baseMaxValue, baseMinValue);
};

export const createPropertiesFromEntities = (entities: Property[], events?: Events): Property[] =>
    entities.map((entity) => createPropertyFromEntity(entity, events));

export const createPropertiesStructure = (
    entities: Property[] = [],
    presets: PropertyPreset[] = [],
    events: Events,
    parentId: string,
): PropertiesStructure => {
    let types: PropertyType[] = [];
    let items: Property[] = [];

    if (entities.length) {
        items = entities.map((entity) => {
            types.push(entity.type);
            return createPropertyFromEntity(entity, events);
        });
    }

    if (presets.length && parentId) {
        items = presets.map((preset) => {
            types.push(preset.type);
            return createPropertyFromPreset(preset, parentId, events);
        });
    }

    return new Structure<PropertyType, Property>('Property', types, items, events);
};
