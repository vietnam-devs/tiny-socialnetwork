import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import * as postActions from '../store/actions/post.action';
import * as fromPost from '../store/reducers';
import { Store } from '@ngrx/store';

@Component({
    templateUrl: './news-feed-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedDetailsComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  // post: Post  ;
  constructor(private _location: Location, private store: Store<fromPost.State>, route: ActivatedRoute) {

    this.actionsSubscription = route.params
      .map(params => new postActions.Select(params.id))
      .subscribe(store);
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  onAddComment($event) {
    console.log('Add comment:' + $event.content);
  }

  onBack() {
    this._location.back();
  }
}

