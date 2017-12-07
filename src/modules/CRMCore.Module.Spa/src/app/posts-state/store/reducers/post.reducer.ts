import * as postAction from '../actions/post.action';
import { Post } from '../../models/post.model';

export interface State {
  currentPage: number;
  loading: boolean;
  postIds: string[];
  posts: Post[];
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  postIds: [],
  posts: []
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
        posts: [...state.posts, ...action.payload.items],
        postIds:[...state.postIds,  ...action.payload.items.map((post:Post) => post.id)]        
      }
    }
    default: {
      return state;
    }
  }
}

export const getPosts = (state: State) => state.posts;
