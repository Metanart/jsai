import { Meal } from './Meal';
import { mapMealTypeToPreset } from './MealPresets';
import { MealType } from './MealTypes';
import { MealFactory, MealsFactory } from './MealTypes';

export const createMeal: MealFactory = (type: MealType) => new Meal(type, ...mapMealTypeToPreset[type]);

export const createMeals: MealsFactory = (types: MealType[]) => types.map((type: MealType) => createMeal(type));
