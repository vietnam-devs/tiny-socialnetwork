import * as postAction from '../actions/post.action';
import * as ActionType from '../actions/post-constant-type.action';
import { CommentActions, CommentActionTypes } from '../actions/comment.action';

import { ClapActions, ClapActionTypes } from '../actions/clap.action';

import { Post, Comment, Clap } from '../../models';

import { debug } from 'util';
import { post } from 'selenium-webdriver/http';

export interface State {
  currentPage: number;
  loading: boolean;
  postIds: string[];
  posts: { [id: string]: Post };
  selectedPostId: string | null;
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  postIds: [],
  posts: {},
  selectedPostId: null
};

export function reducer(
  state = initialState,
  action: postAction.Actions | CommentActions | ClapActions
): State {
  switch (action.type) {
    case ActionType.LOAD_STARTED: {
      return {
        ...state,
        loading: true
      };
    }

    case ActionType.LOAD_SUCCESS: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        loading: false,
        posts: { ...state.posts, ...action.payload.entities.posts },
        postIds: [...state.postIds, ...action.payload.result]
      };
    }

    case ActionType.GET_POST_BY_ID: {
      return {
        ...state,
        selectedPostId: action.payload
      };
    }

    case ActionType.ADD_POST_SUCCESS: {
      if(state.posts[action.payload.id] != null) {
        return state;
      }
      const newPost: { [id: string]: Post } = {};
      newPost[action.payload.id] = { ...new Post(), ...action.payload };
      return {
        ...state,
        posts: { ...newPost, ...state.posts },
        postIds: [action.payload.id, ...state.postIds]
      };
    }

    case ActionType.REMOVE_POST_SUCCESS: {
      return {
        ...state,
        postIds: state.postIds.filter(id => id != action.payload)
      };
    }

    case CommentActionTypes.ADD_COMMENT_SUCCESS: {
      const postId  = action.payload.postId;
      const commentId = action.payload.id;
      const post = state.posts[postId];
      if(post.comments.indexOf(action.payload.id) >= 0){
        return state;
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: { ...post, comments: post.comments.concat(commentId) }
        }
      };
    }

    case ClapActionTypes.ADD_CLAP_SUCCESS: {
      const post = state.posts[action.payload.entityId];
      if(post.claps.indexOf(action.payload.id) >= 0){
        return state;
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.entityId]: {...post, claps: post.claps.concat(action.payload.id)}
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getPostIds = (state: State) => state.postIds;

export const getPosts = (state: State) => state.posts;

export const getSelectedId = (state: State) => state.selectedPostId;
