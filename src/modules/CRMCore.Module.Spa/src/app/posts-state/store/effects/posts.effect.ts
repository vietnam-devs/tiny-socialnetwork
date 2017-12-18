import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';

import * as formAction from '../actions';
import * as fromReducer from '../../store/reducers';

import { PostService } from '../../services/post.service';
import { PostState } from '../reducers';
import { postSchema } from '../../models/schema';
import { Post, Comment, AddClapRequest } from '../../models';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private store: Store<PostState>,
    private postService: PostService
  ) {}

  @Effect()
   
  loadPosts$: Observable<Action> = this.actions$
    .ofType(formAction.LOAD)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: any) => !store.PostFeature.posts.loading)
    .mergeMap(store => {      
      return this.postService
        .getPosts(store.PostFeature.posts.currentPage)
        .map(res =>
          new formAction.LoadSuccess(normalize(res.items, [postSchema]))
        )
        .catch(error => of(new  formAction.LoadFail(error)));
    });

  @Effect()
  loadPostsStarted$: Observable<Action> = this.actions$
    .ofType(formAction.LOAD)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: any) => !store.PostFeature.posts.loading)
    .map(() => new formAction.LoadStarted());

 @Effect()
  addPost$ = this.actions$
  .ofType(formAction.ADD_POST)
  .switchMap((post: any) =>
    this.postService
      .createPost(post.payload)
      .map(res => new formAction.AddPostSuccess(res))
      .catch(error => of( new formAction.AddPostFail(error)))
  );

  @Effect()
  removePost$: Observable<Action> = this.actions$
    .ofType(formAction.REMOVE_POST)
    .map(toPayload)
    .switchMap((postId: string) => {
      const id = postId;
      return this.postService
        .deletePost(postId)
        .map(() => new formAction.RemovePostSuccess(id));
    });


  @Effect()
  addClap$ = this.actions$
    .ofType(formAction.ADD_CLAP)
    .map(toPayload)
    .switchMap((clap: AddClapRequest) => {
      const clapReq = clap;
      return this.postService
        .addClap(clapReq)
        .map(res => new formAction.AddClapSuccess(res));
    });

  @Effect()
  addComment$ = this.actions$
    .ofType(formAction.ADD_COMMENT)
    .map(toPayload)
    .switchMap((comment: Comment) =>
      this.postService
        .addComment(comment)
        .map(res => new formAction.AddCommentSuccess(res))
    );

  
    
}
