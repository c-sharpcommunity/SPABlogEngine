import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../../services/post-service.service';
import { NotifService } from './../../services/notif-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/Post';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

@Component({
  selector: 'app-updatepost',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  complexForm: FormGroup;
  listCategories: any = [];
  imageUrl: string = 'https://localhost:44374/Upload/f452fa5388cc66923fdd.jpg';
  public progress: number;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
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
        postCategoryId: ['', Validators.required],
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
            postCategoryId: [post.postCategoryId, Validators.required],
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

  public updatePost(model: Post) {
    this.postService
      .updatePost(model)
      .then(resp => {
        this.router.navigate(['/list']);
        this.notifService.success('Update post successful.');
      })
      .catch(exp => {
        this.notifService.error('Server Exception');
      });
  }

  upload(files) {
    debugger;
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    const uploadReq = new HttpRequest(
      'POST',
      `https://localhost:44374/api/upload`,
      formData,
      {
        reportProgress: true
      }
    );

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString();
      }
    });
  }
}
