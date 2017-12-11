import * as postAction from '../actions/post.action';
import * as ActionType from '../actions/post-constant-type.action';
import { Post, Comment } from '../../models';

import { debug } from 'util';


export interface State {
  currentPage: number;
  loading: boolean;
  postIds: string[];
  posts: { [id: string]: Post };
  comments: { [id: string]: Comment };
  selectedPostId: string | null;
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  postIds: [],
  posts: {},
  comments: {},
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
      let newPost: { [id: string]: Post } = {}
      newPost[action.payload.id] = {...new Post(),  ...action.payload};
      return {
        ...state,
        posts: { ...newPost, ...state.posts },
        postIds: [ action.payload.id, ...state.postIds,]
      };
    }

    case ActionType.REMOVE_POST_SUCCESS: {
      return {
        ...state,
        postIds: state.postIds.filter(id => id != action.payload)
      };
    }

    case ActionType.ADD_COMMENT: {
      return AddComment(state, action);
    }

    default: {
      return state;
    }
  }
}

function AddComment(state: State, action) {
  const { payload } = action;
  const { postId, commentId, comment, ownerName } = payload;
  // Look up the correct post, to simplify the rest of the code
  const post = state.posts[postId];

  return {
    ...state,
    // Update our Post object with a new "comments" array
    posts: {
      ...state.posts,
      [postId]: { ...post, comments: post.comments.concat(commentId) }
    },
    comments: {
      ...state.comments,
      [commentId]: {
        id: commentId,
        postId: postId,
        comment: comment,
        ownerId: '00000000-0000-0000-0000-000000000000',
        ownerName: ownerName
      }
    }
  };
}

export const getPostIds = (state: State) => state.postIds;

export const getPosts = (state: State) => state.posts;

export const getComments = (state: State) => state.comments;

export const getSelectedId = (state: State) => state.selectedPostId;
