import { FinderResultsSortedByType } from '@classes/common/Finder/FinderTypes';

import { Recipe } from './Recipe';
import { mapRecipeTypeToPreset } from './RecipePresets';
import { RecipeType } from './RecipeTypes';
import { RecipeFactory, RecipesFactory } from './RecipeTypes';

export const createRecipe: RecipeFactory = (type: RecipeType, availableResources?: FinderResultsSortedByType) =>
    new Recipe(type, ...mapRecipeTypeToPreset[type], availableResources);

export const createRecipes: RecipesFactory = (types: RecipeType[], availableResources?: FinderResultsSortedByType) =>
    types.map((type: RecipeType) => createRecipe(type, availableResources));
