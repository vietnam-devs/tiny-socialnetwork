import * as postAction from '../actions/post.action';
import * as ActionType from '../actions/post-constant-type.action';
import { Post, Comment, Clap } from '../../models';

import { debug } from 'util';
import { post } from 'selenium-webdriver/http';

export interface State {
  currentPage: number;
  loading: boolean;
  postIds: string[];
  posts: { [id: string]: Post };
  comments: { [id: string]: Comment };
  claps: { [id: string]: Clap };
  selectedPostId: string | null;
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  postIds: [],
  posts: {},
  comments: {},
  claps: {},
  selectedPostId: null
};

export function reducer(
  state = initialState,
  action: postAction.Actions
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
        comments: { ...state.comments, ...action.payload.entities.comments },
        claps: { ...state.claps, ...action.payload.entities.claps },
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
      let newPost: { [id: string]: Post } = {};
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

    case ActionType.ADD_COMMENT_SUCCESS: {
      return AddComment(state, action);
    }

    case ActionType.ADD_CLAP_SUCCESS: {
      const post = state.posts[action.payload.entityId];
    
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.entityId]: {...post, claps: post.claps.concat(action.payload.id)}
        },
        claps: {
          ...state.claps,
          [action.payload.id] : action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}

function AddComment(state: State, action) {
  const { payload } = action;
  const { postId, id, comment, ownerName, createdDate } = payload;
  // Look up the correct post, to simplify the rest of the code
  const post = state.posts[postId];

  return {
    ...state,
    // Update our Post object with a new "comments" array
    posts: {
      ...state.posts,
      [postId]: { ...post, comments: post.comments.concat(id) }
    },
    comments: {
      ...state.comments,
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

export const getPostIds = (state: State) => state.postIds;

export const getPosts = (state: State) => state.posts;

export const getComments = (state: State) => state.comments;

export const getClaps = (state: State) => state.claps;

export const getSelectedId = (state: State) => state.selectedPostId;
