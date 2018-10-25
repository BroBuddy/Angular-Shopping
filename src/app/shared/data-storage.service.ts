import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    apiUrl = 'https://angular-shopping-8bce0.firebaseio.com/';

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put(this.apiUrl + 'recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get(this.apiUrl + 'recipes.json')
            .subscribe(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
