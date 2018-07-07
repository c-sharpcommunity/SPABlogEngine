import { NotifService } from './../../services/notif-service.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service.service';
import { Category } from './../../models/Category';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  listCategories: any = [];
  filtredCategories: any = [];
  selectedItem: number;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(
    private _categoryService: CategoryService,
    private notifService: NotifService,
    private router: Router
  ) {
    this.init();
  }

  private init() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };

    this.selectedItem = -1;
    this._categoryService
      .getCategories()
      .then(response => {
        this.listCategories = response.json() as Category[];
        this.filtredCategories = this.listCategories.slice(0);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      })
      .catch(resp => {
        console.log(resp);
        this.notifService.error('Server Exception was raised');
      });
  }
  public searchCategories() {
    if (this.selectedItem == -1) {
      this.filtredCategories = this.listCategories.slice(0);
    } else {
      this.filtredCategories = this.listCategories.filter(
        category => category.id == this.selectedItem
      );
    }
  }

  public deleteCategory(id: number) {
    this._categoryService
      .deleteCategory(id)
      .then(response => {
        this.filtredCategories = this.filtredCategories.filter((item: Category) => {
          return item.id != id;
        });
        this.router.navigate(["/categories"]);
        this.notifService.success('Delete category successful.');
      })
      .catch(resp => {
        this.notifService.error('Server Exception');
      });
  }

  ngOnInit() {}
}
