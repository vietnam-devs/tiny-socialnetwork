import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { Store } from '@ngrx/store';
import { Post, Comment, Clap } from '../models';

@Component({
    templateUrl: './news-feed-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedDetailsComponent implements OnInit ,OnDestroy {
  actionsSubscription: Subscription;
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;
  claps$: Observable<Clap[]>;

  numberOfClaps: number;
  postId: string;
  clapType: string;

  constructor(private _location: Location, private store: Store<fromReducer.State>, route: ActivatedRoute) {     
   
    this.actionsSubscription = route.params
      .map(params => {
        this.postId = params.id;
        return new fromAction.GetPostById(params.id);
      })
      .subscribe(store);
  }

  ngOnInit(): void {
    this.post$ = this.store.select(fromReducer.getSelectedPost);
    this.comments$ = this.store.select(fromReducer.getPostComments);
    this.claps$ =  this.store.select(fromReducer.getPostClaps);
    this.clapType = 'Post';
    this.claps$.subscribe(clap => {
      this.numberOfClaps = clap ? clap.length : 0;
    });
   
  }

ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
  onAddComment(comment: Comment) {
    this.store.dispatch(new fromAction.AddComment(comment));
  }

  onClapPost() {
    this.store.dispatch(new fromAction.AddClap({
      entityId: this.postId,
      entityType: this.clapType
    }));
  }

  onBack() {
    this._location.back();
  } 
}

