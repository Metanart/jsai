import { mapMealTypeToPreset } from '../Meal/MealPresets';
import { RecipeType } from './RecipeTypes';
import { RecipePreset } from './RecipeTypes';

export const mapRecipeTypeToPreset: Record<RecipeType, RecipePreset> = {
    ...mapMealTypeToPreset,
};
