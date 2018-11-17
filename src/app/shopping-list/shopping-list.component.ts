import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
