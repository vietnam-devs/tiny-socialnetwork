import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { debug } from 'util';
import { PaginatedItem } from '../../shared/models/paginateditem.model';
import * as fromPost from '../store/reducers';
import * as postAction from '../store/actions/post.action';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./style.css']
})
export class NewsFeedComponent implements OnInit {
  posts$: Observable<Post[]>;

  posts: Post[] = [];
  searchTerm: string;
  page: number;

  constructor(
    private postService: PostService,
    private store: Store<fromPost.State>
  ) {
    this.page = 0;
    this.posts$ = store.select(fromPost.getPostCollection);
  }

  ngOnInit(): void {
    //this.store.dispatch(new postAction.Load());
    this.loadPosts();
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  loadPosts(): void {
    this.page += 1;
    this.postService
      .getPosts(this.page)
      .subscribe((result: PaginatedItem<Post>) => {
        if (result.items.length > 0) {
          //this.posts.push(...result.items);

          this.store.dispatch(new postAction.Load(result.items));
        }
      });
  }

  onScrollDown() {
    //this.loadPosts();
  }
}
