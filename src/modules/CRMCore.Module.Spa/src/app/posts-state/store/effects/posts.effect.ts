import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';

import {PostActionCreators, LOAD} from '../actions/post.action';
import { PostService } from '../../services/post.service';
import { PostState } from '../reducers';
import  {postSchema} from '../../models/schema';

@Injectable()
export class PostEffects {
  @Effect()
  loadPosts$: Observable<Action> = this.actions$
    .ofType(LOAD)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: any) => !store.PostFeature.posts.loading)
    .mergeMap(store => {
      return this.postService
        .getPosts(store.PostFeature.posts.currentPage)
        .map(res => PostActionCreators.loadSuccess(normalize(res.items, [postSchema])))
        .catch(error => of( PostActionCreators.loadFail(error)));
    });

  @Effect()
  loadPostsStarted$: Observable<Action> = this.actions$
    .ofType(LOAD)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: any) => !store.PostFeature.posts.loading)
    .map(()=>PostActionCreators.loadStarted());

  constructor(
    private actions$: Actions,
    private store: Store<PostState>,
    private postService: PostService,
  ) {}
}
