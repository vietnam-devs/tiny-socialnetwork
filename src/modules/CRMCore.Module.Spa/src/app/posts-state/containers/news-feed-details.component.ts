import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import * as postActions from '../store/actions/post.action';
import * as fromPost from '../store/reducers';
import { Store } from '@ngrx/store';
import { PostActionCreators } from '../store/actions/post.action';
import { Post, Comment } from '../models';

@Component({
    templateUrl: './news-feed-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedDetailsComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;
  // post: Post  ;
  constructor(private _location: Location, private store: Store<fromPost.State>, route: ActivatedRoute) {
    this.post$ = store.select(fromPost.getSelectedPost);
    this.comments$ = store.select(fromPost.getPostComments);

    this.actionsSubscription = route.params
      .map(params => PostActionCreators.getPostById(params.id))
      .subscribe(store);
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  onAddComment(comment: Comment) {
    console.log('Add comment:' + comment.comment);
    this.store.dispatch(PostActionCreators.addComment(comment));
  }

  onBack() {
    this._location.back();
  }
}

