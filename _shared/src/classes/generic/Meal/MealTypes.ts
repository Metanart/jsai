import { ResourceType } from '@classes/common/Resource/ResourceTypes';

import { Meal } from './Meal';

export type MealType = 'smashedApple' | 'brainWithApples' | 'meatWithApples';

export type MealPreset = [ResourceType[]];

export type MealFactory = (type: MealType) => Meal;

export type MealsFactory = (types: MealType[]) => Meal[];
