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
      'Schnitzel mit Pommes',
      'Ein tolles Rezept für alle Schnitzel-Liebhaber',
      'https://via.placeholder.com/150x100',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 10),
      ]
    ),
    new Recipe(
      'Vegan Sandwich',
      'Das Sandwich schmeckt besser als bei Subway',
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

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
