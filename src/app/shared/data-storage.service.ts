import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    apiUrl = 'https://angular-shopping-8bce0.firebaseio.com/';

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        return this.http.put(this.apiUrl + 'recipes.json', this.recipeService.getRecipes(), {
            observe: 'body'
        });
    }

    getRecipes() {
        this.http.get<Recipe[]>(this.apiUrl + 'recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
        .pipe(
            map(
                (recipes) => {
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }

                    return recipes;
                }
            )
        )
        .subscribe(
            (recipes) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
