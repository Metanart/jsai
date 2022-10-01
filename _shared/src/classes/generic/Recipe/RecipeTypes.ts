import { FinderResultsSortedByType } from '@classes/common/Finder/FinderTypes';
import { MealType } from '@classes/generic/Meal/MealTypes';
import { MealPreset } from '@classes/generic/Meal/MealTypes';

import { Recipe } from './Recipe';

export type RecipeType = MealType;

export type RecipePreset = MealPreset;

export type RecipeFactory = (type: RecipeType, availableResources?: FinderResultsSortedByType) => Recipe;

export type RecipesFactory = (types: RecipeType[], availableResources?: FinderResultsSortedByType) => Recipe[];
