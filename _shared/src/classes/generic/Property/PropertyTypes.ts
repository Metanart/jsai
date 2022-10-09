import { Structure } from '@generics/Structure/Structure';

import { Property } from './Property';

export type PropertyPreset = Pick<Property, 'type' | 'value'>;

export type PropertiesStructure = Structure<PropertyType, Property>;

export type PropertyType = 'calories' | 'defence' | 'health' | 'energy' | 'fatigue' | 'weight';
