import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './../../services/category-service.service';
import { NotifService } from './../../services/notif-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/Category';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  complexForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notifService: NotifService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.complexForm = fb.group({
        // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
        id: [''],
        title: ['', Validators.required],
      });

      this.categoryService
        .getCategory(id)
        .then(resp => {
          let category = resp.json() as Category;

          this.complexForm = fb.group({
            id: [category.id],
            title: [category.title, Validators.required],
          });
        })
        .catch(exp => {
          this.notifService.error('Server Exception');
        });
    });
  }

  ngOnInit() {
  }

  public updateCategory(model: Category) {
    this.categoryService
      .updateCategory(model)
      .then(resp => {
        this.router.navigate(['/categories']);
        this.notifService.success('Update category successful.');
      })
      .catch(exp => {
        this.notifService.error('Server Exception');
      });
  }
}
