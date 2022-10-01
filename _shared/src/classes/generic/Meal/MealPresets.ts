import { MealType } from './MealTypes';
import { MealPreset } from './MealTypes';

export const mapMealTypeToPreset: Record<MealType, MealPreset> = {
    ['smashedApple']: [['apple']],
    ['brainWithApples']: [['apple', 'brain']],
    ['meatWithApples']: [['apple', 'meat']],
};
