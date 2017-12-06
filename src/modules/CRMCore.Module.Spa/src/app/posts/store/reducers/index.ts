import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromPost from './post.reducer';

export interface PostState {
   posts: fromPost.State
  }

  
  export interface State extends fromRoot.State {
    'posts': PostState;
  }
  
  export const reducers = {
    posts: fromPost.reducer
  };

  export const getPostsState = createFeatureSelector<PostState>('PostFeature');

  export const getPostEntitiesState = createSelector(
    getPostsState,
    state => state.posts
  );
  

  export const getPostCollection = createSelector(
    getPostEntitiesState,
    fromPost.getPosts
  );
  