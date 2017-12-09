import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromPost from './post.reducer';
import { Post, Comment } from '../../models';
import { Observable } from 'rxjs/Observable';
import { combineReducers } from '@ngrx/store/src/utils';

export interface PostState {
   posts: fromPost.State;
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

  export const getSelectedPostId = createSelector(
    getPostEntitiesState,
    fromPost.getSelectedId
  );

  export const getPostIdsCollection = createSelector(
    getPostEntitiesState,
    fromPost.getPostIds
  );

  export const getComments = createSelector(
    getPostEntitiesState,
    fromPost.getComments
  );

  export const getPostEntities = createSelector(getPostEntitiesState, fromPost.getPosts);

  export const getSelectedPost = createSelector(
    getPostEntities,
    getSelectedPostId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );

  export const getPostComments = createSelector(
    getPostEntities,
    getSelectedPostId,
    getComments,
    (entities, selectedId, comments) => {
      return entities[selectedId].comments.map(comment => comments[comment]);
    }
  );

  export const getPostCollection = createSelector(getPostEntities, getPostIdsCollection, (entities, ids) => {
    return ids.map(id => entities[id]);
  });
