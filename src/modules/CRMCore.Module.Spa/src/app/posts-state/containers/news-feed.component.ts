import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PostService } from '../services/post.service';
import { Post, Comment } from '../models';
import { debug } from 'util';
import { PaginatedItem } from '../../shared/models/paginateditem.model';
import * as fromPost from '../store/reducers';
import { PostActionCreators } from '../store/actions/post.action';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./style.css']
})
export class NewsFeedComponent implements OnInit {
  posts$: Observable<Post[]>;
  comment$: Observable<{ [Id: string]: Comment }>;

  searchTerm: string;
  toggleAddPost: boolean;

  constructor(
    private postService: PostService,
    private store: Store<fromPost.State>
  ) {
    this.posts$ = store.select(fromPost.getPostCollection);
    this.comment$ = store.select(fromPost.getCommentEntities);
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  loadPosts(): void {
    this.store.dispatch(PostActionCreators.load());
  }

  onScrollDown() {
    this.loadPosts();
  }

  handleToggleAddPost() {
    this.toggleAddPost = !this.toggleAddPost;
  }

  onDeletePost(postId: string) {
    this.store.dispatch(PostActionCreators.removePost(postId));
  }

  getCommentById(commentId: string) {
    return this.comment$.map(comment => comment[commentId]);
  }
}
