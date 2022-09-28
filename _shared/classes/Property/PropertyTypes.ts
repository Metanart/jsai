import { ValueNumber } from '@classes/Value/Value';

import { Property } from './Property';

export type PropertyType = 'calories' | 'defence' | 'health' | 'energy' | 'fatigue' | 'weight';

export type PropertyPreset = [PropertyType, ValueNumber];

export type PropertyFactory = (type: PropertyType, value: ValueNumber) => Property;

export type PropertiesFactory = (propertiesPresets: PropertyPreset[]) => Property[];
