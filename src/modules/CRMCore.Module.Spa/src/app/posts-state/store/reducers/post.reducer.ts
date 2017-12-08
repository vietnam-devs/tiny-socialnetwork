import * as postAction from '../actions/post.action';
import { Post, Comment } from '../../models';
import { stat } from 'fs';

export interface State {
  currentPage: number;
  loading: boolean;
  postIds: string[];
  posts: {[id: string]: Post};
  comments: {[id: string]: Comment};
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  postIds: [],
  posts: {},
  comments: {}
};

export function reducer(
  state = initialState,
  action: postAction.Actions
): State {
  switch (action.type) {
    case postAction.LOAD_STARTED: {
      return {
          ...state,
         loading: true
      };
    }
    case postAction.LOAD_SUCCESS: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        loading: false,
        posts: {...state.posts, ...action.payload.entities.posts},
        comments: {...state.comments, ...action.payload.entities.comments},
        postIds: [...state.postIds, ...action.payload.result]
      }
    }
    default: {
      return state;
    }
  }
}

export const getPostIds = (state: State) => state.postIds;

export const getPosts = (state: State) => state.posts;

export const getComments = (state: State) => state.comments;
