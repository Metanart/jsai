import { Events } from '@generics/Events/Events';
import { Structure } from '@generics/Structure/Structure';

import { Property } from './Property';
import { PropertyEntity } from './PropertyEntities';
import { PropertiesStructure, PropertyPreset, PropertyType } from './PropertyTypes';

export const createProperty = (type: PropertyType, value: number, events?: Events) =>
    new Property('', type, value, events);

export const createPropertyFromPreset = (preset: PropertyPreset, events?: Events) =>
    new Property('', preset.type, preset.value, events);

export const createPropertyFromEntity = (entity: PropertyEntity, events?: Events): Property => {
    const { id, type, value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue } = entity;
    return new Property(id, type, value, events, maxValue, minValue, baseValue, baseMaxValue, baseMinValue);
};

export const createPropertiesFromPresets = (presets: PropertyPreset[], events?: Events) =>
    presets.map((preset) => createPropertyFromPreset(preset, events));

export const createPropertiesFromEntities = (entities: PropertyEntity[], events?: Events): Property[] =>
    entities.map((entity) => createPropertyFromEntity(entity, events));

const createPropertiesStructure = (
    entities: PropertyEntity[] = [],
    presets: PropertyPreset[] = [],
    events: Events,
): PropertiesStructure => {
    let types: PropertyType[] = [];
    let items: Property[] = [];

    if (entities.length) {
        items = entities.map((entity) => {
            types.push(entity.type);
            return createPropertyFromEntity(entity, events);
        });
    } else if (presets.length) {
        items = presets.map((preset) => {
            types.push(preset.type);
            return createPropertyFromPreset(preset, events);
        });
    }

    return new Structure<PropertyType, Property>('Property', types, items, events);
};

export const createPropertiesStructureFromEntities = (entities: PropertyEntity[], events: Events) =>
    createPropertiesStructure(entities, [], events);

export const createPropertiesStructureFromPresets = (presets: PropertyPreset[], events: Events) =>
    createPropertiesStructure([], presets, events);
