import { Structure } from '@shared/classes/generic/Structure/Structure';

import { Property } from './Property';
import { PropertyEntity } from './PropertyEntity';

export type PropertyPreset = Pick<PropertyEntity, 'type' | 'value'>;

export type PropertiesStructure = Structure<PropertyType, Property, PropertyEntity>;

export type PropertyType = 'calories' | 'defence' | 'health' | 'energy' | 'fatigue' | 'weight';
