import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

const initalState = {
    ingredients: [
        new Ingredient('Apples', 15),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initalState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}
