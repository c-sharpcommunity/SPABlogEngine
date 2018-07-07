import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { NotifService } from '../../services/notif-service.service';
import { CategoryService } from '../../services/category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnChanges, OnInit {
  complexForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private categoryService: CategoryService,
    private notifService: NotifService,
    private router: Router
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      // tslint:disable-next-line:max-line-length
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      title: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
  }

  public newCategory(model: Category) {
    this.categoryService
      .addNewCategory(model)
      .then(resp => {
        this.router.navigate(["/categories"]);
        this.notifService.success('Insertion category successful.');
      })
      .catch(exp => {
        this.notifService.error('Server Exception');
      });
  }
}
