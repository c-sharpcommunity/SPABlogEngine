import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/Post';
import { NotifService } from '../../services/notif-service.service';
import { PostService } from '../../services/post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnChanges, OnInit {
  complexForm: FormGroup;
  listCategories: any = [];

  constructor(
    fb: FormBuilder,
    private postService: PostService,
    private notifService: NotifService,
    private router: Router
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      // tslint:disable-next-line:max-line-length
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      postCategoryId: [null, Validators.required],
      title: [null, Validators.required],
      image: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.postService
      .getPosts()
      .then(response => {
        this.listCategories = response.json() as Post[];
      })
      .catch(resp => {
        console.log(resp);
        this.notifService.error('Server Exception');
      });
  }

  public newPost(model: Post) {
    this.postService
      .addNewPost(model)
      .then(resp => {
        this.router.navigate(["/list"]);
        this.notifService.success('Insertion post successful.');
      })
      .catch(exp => {
        this.notifService.error('Server Exception');
      });
  }
}
