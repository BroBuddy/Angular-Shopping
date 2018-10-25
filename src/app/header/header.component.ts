import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private router: Router) { }

    onSaveData() {
      this. dataStorageService.storeRecipes()
          .subscribe(
              (response: Response) => {
                console.log(response);
              }
          );
    }

    onFetchData() {
      this.dataStorageService.getRecipes();
        this.router.navigate(['/']);
    }

}
