import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe Name 1',
      'Recipe Description 1',
      'https://via.placeholder.com/150x100',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 10),
      ]
    ),
    new Recipe(
      'Recipe Name 2',
      'Recipe Description 2',
      'https://via.placeholder.com/150x100',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Salad', 10),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
