import { FinderResultsSortedByType } from '@classes/common/Finder/FinderTypes';
import { List } from '@classes/generic/Collection/Collection';
import { Entity } from '@classes/generic/Entity/Entity';
import { Events } from '@classes/generic/Events/Events';
import { Recipe } from '@classes/generic/Recipe/Recipe';
import { RecipeType } from '@classes/generic/Recipe/RecipeTypes';
import { createRecipe, createRecipes } from '@classes/generic/Recipe/RecipeUtils';

export class RecipesManager extends Entity {
    events = new Events();
    recipes = new List<Recipe>();
    availableResources?: FinderResultsSortedByType;

    constructor(recipesTypes?: RecipeType[], availableResources?: FinderResultsSortedByType) {
        super('Recipes manager');
        if (availableResources) this.availableResources = availableResources;
        if (recipesTypes) this.recipes.addItems(createRecipes(recipesTypes, availableResources));

        if (availableResources && recipesTypes) this.recalculateAvailability();
    }

    addRecipe(recipeType: RecipeType): false | Recipe {
        return this.recipes.addUniqueItem(createRecipe(recipeType, this.availableResources));
    }

    removeRecipe(recipeType: RecipeType) {
        return this.recipes.removeItem({ type: recipeType } as Recipe, 'type');
    }

    recalculateAvailability() {
        this.recipes.items.map((item: Recipe) => item.calculateAvailability());
    }
}
