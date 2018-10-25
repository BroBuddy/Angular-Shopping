import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Schnitzel mit Pommes',
      'Ein tolles Rezept für alle Schnitzel-Liebhaber',
      'https://www.bz-berlin.de/data/uploads/2014/09/29936709_1410942594-1920x1080.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 10),
      ]
    ),
    new Recipe(
      'Vegan Sandwich',
      'Das Sandwich schmeckt besser als bei Subway',
      'https://tse3.mm.bing.net/th?id=OIP.2XCVO9_oNLH-YfEfuARjrgHaE7&pid=Api',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Salad', 10),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    console.log('addRecipe', recipe);
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
  }
}
