import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/Post';
import { NotifService } from '../../services/notif-service.service';
import { PostService } from '../../services/post-service.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnChanges,  OnInit {
  complexForm: FormGroup;
  listCategories: any = [];
  @Input() public selectedCategoryId: number;

  constructor(
    fb: FormBuilder,
    private postService: PostService,
    private notifService: NotifService
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      // tslint:disable-next-line:max-line-length
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      title: [null, Validators.required],
      image: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.postService
      .getPosts()
      .then(response => {
        this.listCategories = response.json() as Post[];
      })
      .catch(resp => {
        console.log(resp);
        this.notifService.error('Server Exception was raised');
      });
  }

  public newPost(model: Post) {
    model.postCategoryId = 1;
    this.postService
      .addNewPost(model)
      .then(resp => {
        this.notifService.success('Insertion operation was well done');
      })
      .catch(exp => {
        this.notifService.error('Server Exception was raised');
      });
  }
}
