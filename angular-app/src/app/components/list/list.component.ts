import { NotifService } from './../../services/notif-service.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { Post } from './../../models/Post';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listPosts: any = [];
  filtredPosts: any = [];
  postName: string;
  selectedItem: number;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(
    private _postService: PostService,
    private notifService: NotifService
  ) {
    this.init();
  }

  private init() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.selectedItem = -1;
    this._postService
      .getPosts()
      .then(response => {
        this.listPosts = response.json() as Post[];
        this.filtredPosts = this.listPosts.slice(0);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      })
      .catch(resp => {
        console.log(resp);
        this.notifService.error('Server Exception was raised');
      });
  }
  public searchPost() {
    if (this.selectedItem == -1) {
      this.filtredPosts = this.listPosts.slice(0);
    } else {
      this.filtredPosts = this.listPosts.filter(
        post => post.id == this.selectedItem
      );
    }
  }

  public deletePost(id: number) {
    this._postService
      .deletePost(id)
      .then(response => {
        this.filtredPosts = this.filtredPosts.filter((item: Post) => {
          return item.id != id;
        });
        this.notifService.success('Delete Operation was well done');
        // this.dtTrigger.next();
      })
      .catch(resp => {
        this.notifService.error('Server Exception was raised');
      });
  }

  ngOnInit() {}
}
