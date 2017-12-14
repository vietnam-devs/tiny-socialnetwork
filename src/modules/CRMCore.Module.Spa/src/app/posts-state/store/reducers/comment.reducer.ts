import { CommentActions, CommentActionTypes } from '../actions/comment.action';
import * as postActions from '../actions/post.action';

import * as PostActionTypes from '../actions/post-constant-type.action';

import { Post, Comment } from '../../models';

export interface State {
  entities: { [id: string]: Comment };
}

const initialState: State = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: CommentActions | postActions.Actions
): State {
  switch (action.type) {
    case PostActionTypes.LOAD_SUCCESS: {
      return {...state, entities: { ...state.entities, ...action.payload.entities.comments }};
    }
    case CommentActionTypes.ADD_COMMENT_SUCCESS: {
      return AddComment(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getComments = (state: State) => state.entities;

function AddComment(state: State, action) {
  const { payload } = action;
  const { postId, id, comment, ownerName, createdDate } = payload;

  return {
    ...state,
    // Update our Post object with a new "comments" array
    entities: {
      ...state.entities,
      [id]: {
        id: id,
        postId: postId,
        comment: comment,
        ownerId: '00000000-0000-0000-0000-000000000000',
        ownerName: ownerName,
        createdDate: createdDate
      }
    }
  };
}
