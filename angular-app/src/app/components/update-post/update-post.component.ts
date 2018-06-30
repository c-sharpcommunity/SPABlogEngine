import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { PostService } from './../../services/post-service.service';
import { NotifService } from './../../services/notif-service.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-updatepost',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  complexForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private notifService: NotifService,
    private route: ActivatedRoute
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.complexForm = fb.group({
        // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
        id: [''],
        title: ['', Validators.required],
        image: ['', Validators.required],
        content: ['', Validators.required]
      });

      this.postService
        .getPost(id)
        .then(resp => {
          let post = resp.json() as Post;

          this.complexForm = fb.group({
            // tslint:disable-next-line:max-line-length
            // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
            id: [post.id],
            title: [post.title, Validators.required],
            image: [post.image, Validators.required],
            content: [post.content, Validators.required]
          });
        })
        .catch(exp => {
          this.notifService.error('Server Exception was raised');
        });
    });
  }

  ngOnInit() {}

  public updatePost(model: Post) {
    console.log(model);
    this.postService
      .updatePost(model)
      .then(resp => {
        this.notifService.success('Update operation is well done');
      })
      .catch(exp => {
        this.notifService.error('Server Exception was raised');
      });
  }
}
