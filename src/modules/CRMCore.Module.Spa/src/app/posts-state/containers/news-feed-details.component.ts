import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import * as postActions from '../store/actions/post.action';
import * as fromPost from '../store/reducers';
import { Store } from '@ngrx/store';
import { PostActionCreators } from '../store/actions/post.action';
import { Post, Comment, Clap } from '../models';

@Component({
    templateUrl: './news-feed-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedDetailsComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;
  claps$: Observable<Clap[]>;

  numberOfClaps: number;
  postId: string;
  // post: Post  ;
  constructor(private _location: Location, private store: Store<fromPost.State>, route: ActivatedRoute) {
    this.post$ = store.select(fromPost.getSelectedPost);
    this.comments$ = store.select(fromPost.getPostComments);
    this.claps$ = store.select(fromPost.getPostClaps);

    this.actionsSubscription = route.params
      .map(params => {
        this.postId = params.id;
        return PostActionCreators.getPostById(params.id);
      })
      .subscribe(store);
  }

  ngOnInit(): void {
    this.claps$.subscribe(clap => {
      this.numberOfClaps = clap.length;
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  onAddComment(comment: Comment) {
    this.store.dispatch(PostActionCreators.addComment(comment));
  }

  onBack() {
    this._location.back();
  }
}

