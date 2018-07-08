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
} from '@angular/common/http';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  complexForm: FormGroup;
  listCategories: any = [];
  public progress: number;
  public message: string;
  files: File;
  public imageUrl;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
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
          this.imageUrl = 'https://localhost:44374/Upload/Posts/' + post.image;

          this.complexForm = fb.group({
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
    this.categoryService
      .getCategories()
      .then(response => {
        this.listCategories = response.json() as Post[];
      })
      .catch(resp => {
        console.log(resp);
        this.notifService.error('Server Exception');
      });
  }

  getFiles(event) {
    this.files = event.target.files;
  }

  public updatePost(model: Post) {
    if (this.files) {
      model.image = this.files[0].name;
      this.upload(this.files);
    }

    this.postService
    .updatePost(model)
    .then(resp => {
      this.router.navigate(['/posts']);
      this.notifService.success('Update post successful.');
    })
    .catch(exp => {
      this.notifService.error('Server Exception');
    });
  }

  private upload(files) {
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
      return this.message;
    });
  }
}
