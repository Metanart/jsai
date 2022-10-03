import { Events } from '@shared/classes/generic/Events/Events';
import { Structure } from '@shared/classes/generic/Structure/Structure';
import { v4 } from 'uuid';

import { Property } from './Property';
import { PropertyEntity } from './PropertyEntity';
import { PropertiesStructure, PropertyPreset, PropertyType } from './PropertyTypes';

export const createPropertyFromPreset = (preset: PropertyPreset, events: Events, parentId: string) =>
    new Property(v4(), parentId, preset.type, events, preset.value);

export const createPropertiesFromPresets = (presets: PropertyPreset[], events: Events, parentId: string) =>
    presets.map((preset) => createPropertyFromPreset(preset, events, parentId));

export const createPropertyFromEntity = (entity: PropertyEntity, events: Events): Property => {
    const { id, parentId, type, value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue } = entity;
    return new Property(id, parentId, type, events, value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue);
};

export const createPropertiesFromEntities = (entities: PropertyEntity[], events: Events): Property[] =>
    entities.map((entity) => createPropertyFromEntity(entity, events));

export const createPropertiesStructure = (
    events: Events,
    entities: PropertyEntity[] = [],
    presets: PropertyPreset[] = [],
    parentId?: string,
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
            return createPropertyFromPreset(preset, events, parentId);
        });
    }

    return new Structure<PropertyType, Property, PropertyEntity>('Property', types, items, events);
};
