import { Property } from './Property';
import { PropertiesFactory, PropertyFactory, PropertyPreset } from './PropertyTypes';

export const createProperty: PropertyFactory = (type, value, ownerId, eventsCategory) =>
    new Property(type, value, ownerId, eventsCategory);

export const createProperties: PropertiesFactory = (presets, ownerId, eventsCategory) => {
    return presets.map((preset: PropertyPreset) => {
        const [type, value] = preset;
        return createProperty(type, value, ownerId, eventsCategory);
    });
};
