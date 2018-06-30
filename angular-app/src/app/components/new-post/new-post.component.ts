import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPost } from '../../models/IPost';
import { NotifService } from '../../services/notif-service.service';
import { PostService } from '../../services/post-service.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  complexForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private postService: PostService,
    private notifService: NotifService
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      // tslint:disable-next-line:max-line-length
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      name: [null, Validators.required],
      mark: [null, Validators.required],
      model: [null, Validators.required]
    });
  }
  ngOnInit() {}

  public newPost(model: IPost) {
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
