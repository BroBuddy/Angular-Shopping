import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    apiUrl = 'https://angular-shopping-8bce0.firebaseio.com/';

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put(this.apiUrl + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get(this.apiUrl + 'recipes.json?auth=' + token)
        // .map(
        //     (response: Response) => {
        //         const recipes: Recipe[] = response.json();
        //
        //         for (const recipe of recipes) {
        //             if (!recipe['ingredients']) {
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //
        //         return recipes;
        //     }
        // )
        .subscribe(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
