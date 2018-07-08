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
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnChanges, OnInit {
  complexForm: FormGroup;
  listCategories: any = [];
  files: File;
  public progress: number;
  public message: string;

  constructor(
    fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private notifService: NotifService,
    private router: Router,
    private http: HttpClient
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      postCategoryId: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

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

  public newPost(model: Post) {
    if (this.files) {
      model.image = this.files[0].name;
      this.upload(this.files);
    }

    this.postService
      .addNewPost(model)
      .then(resp => {
        this.router.navigate(["/posts"]);
        this.notifService.success('Insertion post successful.');
      })
      .catch(exp => {
        this.notifService.error('Server Exception');
      });
  }

  getFiles(event) {
    this.files = event.target.files;
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
