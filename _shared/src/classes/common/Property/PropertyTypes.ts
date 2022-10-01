import { Events } from '@shared/classes/generic/Events/Events';
import { ValueNumber } from '@shared/classes/generic/Value/Value';

import { Property } from './Property';

export type PropertyData = {
    id: number;
    type: PropertyType;
    baseValue: number;
    baseMaxValue: number;
    baseMinValue: number;
    currentValue: number;
    currentMaxValue: number;
    currentMinValue: number;
};

export type PropertyType = 'calories' | 'defence' | 'health' | 'energy' | 'fatigue' | 'weight';

export type PropertyPreset = [PropertyType, ValueNumber];
