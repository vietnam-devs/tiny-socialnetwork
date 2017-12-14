import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromPost from './post.reducer';
import * as fromComment from './comment.reducer';

import * as fromClap from './clap.reducer';

import { Post, Comment, Clap } from '../../models';
import { Observable } from 'rxjs/Observable';
import { combineReducers } from '@ngrx/store/src/utils';

export interface PostState {
   posts: fromPost.State;
   comments: fromComment.State;
   claps: fromClap.State;
  }


  export interface State extends fromRoot.State {
    'posts': PostState;
  }

  export const reducers = {
    posts: fromPost.reducer,
    comments: fromComment.reducer,
    claps: fromClap.reducer,
  };

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

  export const getPostsState = createFeatureSelector<PostState>('PostFeature');

/*
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
  export const getPostEntitiesState = createSelector(
    getPostsState,
    state => state.posts
  );

  export const getCommentEntitiesState = createSelector(
    getPostsState,
    state => state.comments
  );

  export const getClapEntitiesState = createSelector(
    getPostsState,
    state => state.claps
  );


  export const getPostEntities = createSelector(getPostEntitiesState, fromPost.getPosts);

  export const getCommentEntities = createSelector(getCommentEntitiesState, fromComment.getComments);

  export const getClapsEntities = createSelector(getClapEntitiesState, fromClap.getClaps);

  /* be composed
   * together to select different pieces of post state.
   */
  export const getSelectedPostId = createSelector(
    getPostEntitiesState,
    fromPost.getSelectedId
  );

  export const getPostIdsCollection = createSelector(
    getPostEntitiesState,
    fromPost.getPostIds
  );

  export const getPostCollection = createSelector(getPostEntities, getPostIdsCollection, (entities, ids) => {
    return ids.map(id => entities[id]);
  });

  export const getSelectedPost = createSelector(
    getPostEntities,
    getSelectedPostId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );

/**
 * Some selector functions create joins across parts of state.
 */
  export const getPostComments = createSelector(
    getPostEntities,
    getSelectedPostId,
    getCommentEntities,
    (entities, selectedId, comments) => {
      return entities[selectedId].comments.map(comment => comments[comment]);
    }
  );

  export const getPostClaps = createSelector(
    getPostEntities,
    getSelectedPostId,
    getClapsEntities,
    (entities, selectedId, claps) => {
      return entities[selectedId].claps.map(clap => claps[clap]);
    }
  );


