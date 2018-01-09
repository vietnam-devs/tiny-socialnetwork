import * as fromAction from '../actions';
import { Post } from '../../models'

export interface State {
  currentPage: number;
  loading: boolean;
  loaded: boolean;
  posts: { [id: string]: Post };
  selectedPostId: string | null;
}

const initialState: State = {
  currentPage: 1,
  loading: false,
  loaded: false, 
  posts: {},
  selectedPostId: null
};

export function reducer(
  state = initialState,
  action: fromAction.PostAction | fromAction.ClapAction | fromAction.CommentAction
): State {
  switch (action.type) {
    case fromAction.LOAD_STARTED: {
      return {
        ...state,
        loading: true
      };
    }

    case fromAction.LOAD_SUCCESS: {     
      return {
        ...state,
        currentPage: state.currentPage + 1,
        loading: false,
        loaded: true,
       posts: { ...state.posts, ...action.payload.entities.posts }
    
      };
    }

     case fromAction.LOAD_FAIL: {     
      return {
        ...state,       
        loading: false,
        loaded: false    
      };
    }

    case fromAction.GET_POST_BY_ID: {
      return {
        ...state,
        selectedPostId: action.payload
      };
    }

    case fromAction.ADD_POST_SUCCESS: {
      if(state.posts[action.payload.id] != null) {
        return state;
      }
      const newPost: { [id: string]: Post } = {};
      newPost[action.payload.id] = { ...new Post(), ...action.payload };
      return {
        ...state,
        posts: { ...newPost, ...state.posts }    
      };
    }

    case fromAction.REMOVE_POST_SUCCESS: {     
      const deletePost = state.posts[action.payload];    
      const { [deletePost && deletePost.id]: removed, ...result} = state.posts;
      return {
        ...state,
        posts: result
      };
    }
    
    case fromAction.ADD_CLAP_SUCCESS: {
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

    case fromAction.ADD_COMMENT_SUCCESS: {
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
      
    default: {
      return state;
    }
  }
}


export const getPosts = (state: State) => state.posts;

export const getSelectedId = (state: State) => state.selectedPostId;

export const getPostLoaded = (state: State) => state.loaded;