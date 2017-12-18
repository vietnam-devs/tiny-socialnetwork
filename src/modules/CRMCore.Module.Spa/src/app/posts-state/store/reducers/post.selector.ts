import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromPost from './post.reducer';
import * as fromComment from './comment.reducer';
import * as fromClap from './clap.reducer';

export interface PostState {
   posts: fromPost.State;
   comments: fromComment.State;
   claps: fromClap.State;
  }
 
export interface State extends fromRoot.State {
    'posts': PostState}

export const getPostsState = createFeatureSelector<PostState>('PostFeature');
  
  export const getPostEntitiesState
   = createSelector(getPostsState,
    state => state.posts
  );

  export const getCommentEntitiesState = createSelector(getPostsState,
    state => state.comments
  );

  export const getClapEntitiesState = createSelector(getPostsState,
    state => state.claps
  );
  export const getPostEntities = createSelector(getPostEntitiesState, fromPost.getPosts);
  export const getCommentEntities = createSelector(getCommentEntitiesState, fromComment.getComments);
  export const getClapsEntities = createSelector(getClapEntitiesState, fromClap.getClaps);
 
  export const getPostCollection = createSelector(getPostEntities, (entities) => {  
    return Object.keys(entities).map(id => entities[id])
  });

  export const getSelectedPostId = createSelector(
    getPostEntitiesState,
    fromPost.getSelectedId
  );


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
    getCommentEntities,
    (entities, selectedId, comments) => {
      return entities[selectedId] && entities[selectedId].comments.map(comment => comments[comment]);
    }
  );

  export const getPostClaps = createSelector(
    getPostEntities,
    getSelectedPostId,
    getClapsEntities,
    (entities, selectedId, claps) => {
      return entities[selectedId] && entities[selectedId].claps.map(clap => claps[clap]);
    }
  );
