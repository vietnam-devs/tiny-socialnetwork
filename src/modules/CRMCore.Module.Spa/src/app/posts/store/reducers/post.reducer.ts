import * as postAction from '../actions/post.action';
import { Post } from '../../models/post.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  postIds: string[];
  posts: Post[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  postIds: [],
  posts: []
};

export function reducer(
  state = initialState,
  action: postAction.Actions
): State {
  switch (action.type) {
    case postAction.LOAD: {
      return {
          ...state,
          posts: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getPosts = (state: State) => state.posts;
