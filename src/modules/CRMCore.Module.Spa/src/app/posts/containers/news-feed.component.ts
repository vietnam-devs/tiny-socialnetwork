import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PostService } from '../services/post.service';
import { SignalRService } from '../services/signalR.service';
import { Post, Comment, Clap } from '../models';
import { PaginatedItem } from '../../shared/models/paginateditem.model';

import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';


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
    private signalRService: SignalRService,
    private store: Store<fromReducer.State>
  ) {
    this.posts$ = store.select(fromReducer.getPostCollection);
    this.comment$ = store.select(fromReducer.getCommentEntities);
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  loadPosts(): void {
    this.store.dispatch(new fromAction.Load);
  }

  onScrollDown() {
    this.loadPosts();
  }

  handleToggleAddPost() {
    this.toggleAddPost = !this.toggleAddPost;
  }

  onDeletePost(postId: string) {
   this.store.dispatch(new fromAction.RemovePost(postId));
  }

  getCommentById(commentId: string) {
    return this.comment$.map(comment => comment[commentId]);
  }

  onClapPost(postId: string) {
    this.store.dispatch(new fromAction.AddClap({
      entityId: postId,
      entityType: 'Post'
    }));
  }

}
