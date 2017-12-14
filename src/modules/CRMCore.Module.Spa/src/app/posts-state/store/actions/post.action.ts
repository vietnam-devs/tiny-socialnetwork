import { Action } from '@ngrx/store';

import { PaginatedItem } from '../../../shared/models/paginateditem.model';
import { Post, Comment, AddClapRequest, Clap } from '../../models';
import * as ActionType from './post-constant-type.action';

interface Load extends Action {
  type: typeof ActionType.LOAD;
}

interface LoadStarted extends Action {
  type: typeof ActionType.LOAD_STARTED;
}

interface LoadSuccess extends Action {
  type: typeof ActionType.LOAD_SUCCESS;
  payload: any;
}

interface LoadFail extends Action {
  type: typeof ActionType.LOAD_FAIL;
  payload: any;
}

interface AddPost extends Action {
  type: typeof ActionType.ADD_POST;
  payload: Post;
}

interface AddPostFail extends Action {
  type: typeof ActionType.ADD_POST_FAIL;
  payload: any;
}

interface AddPostSuccess extends Action {
  type: typeof ActionType.ADD_POST_SUCCESS;
  payload: Post;
}

interface GetPostById extends Action {
  type: typeof ActionType.GET_POST_BY_ID;
  payload: string;
}

interface AddComment extends Action {
  type: typeof ActionType.ADD_COMMENT;
  payload: Comment;
}

interface AddCommentSuccess extends Action {
  type: typeof ActionType.ADD_COMMENT_SUCCESS;
  payload: Comment;
}

interface RemovePost extends Action {
  type: typeof ActionType.REMOVE_POST;
  payload: string;
}

interface RemovePostSuccess extends Action {
  type: typeof ActionType.REMOVE_POST_SUCCESS;
  payload: string;
}

interface AddClap extends Action {
  type: typeof ActionType.ADD_CLAP;
  payload: AddClapRequest;
}

interface AddClapSuccess extends Action {
  type: typeof ActionType.ADD_CLAP_SUCCESS;
  payload: Clap;
}

export const PostActionCreators = {
  load: (): Action => (<Load>{ type: ActionType.LOAD }),

  loadStarted: (): Action => (<LoadStarted>{ type: ActionType.LOAD_STARTED }),

  loadSuccess: (payload: any): Action => (<LoadSuccess>{ type: ActionType.LOAD_SUCCESS, payload }),

  loadFail: (payload: any): Action => (<any>{ type: ActionType.LOAD_FAIL, payload }),

  addPost: (payload: any): Action => (<AddPost>{ type: ActionType.ADD_POST, payload }),

  addPostSucess: (payload: Post): Action => (<AddPostSuccess>{ type: ActionType.ADD_POST_SUCCESS, payload }),

  addPostFail: (payload: any): Action => (<any>{ type: ActionType.ADD_POST_FAIL, payload }),

  removePost: (payload: string): Action => (<RemovePost>{ type: ActionType.REMOVE_POST, payload }),

  removePostSuccess: (payload: string): Action => (<RemovePostSuccess>{ type: ActionType.REMOVE_POST_SUCCESS, payload }),

  getPostById: (payload: string): Action => (<GetPostById>{ type: ActionType.GET_POST_BY_ID, payload }),

  addComment: (payload: Comment): Action => (<AddComment>{ type: ActionType.ADD_COMMENT, payload }),

  addCommentSuccess: (payload: Comment): Action => (<AddCommentSuccess>{ type: ActionType.ADD_COMMENT_SUCCESS, payload }),

  addClap: (payload: AddClapRequest): Action => (<AddClap>{ type: ActionType.ADD_CLAP, payload }),

  addClapSuccess: (payload: Clap): Action => (<AddClapSuccess>{ type: ActionType.ADD_CLAP_SUCCESS, payload }),
};

export type Actions = Load
                      | LoadStarted
                      | LoadSuccess
                      | LoadFail
                      | GetPostById
                      | AddComment
                      | AddCommentSuccess
                      | AddPost
                      | AddPostSuccess
                      | AddPostFail
                      | RemovePost
                      | RemovePostSuccess
                      | AddClap
                      | AddClapSuccess;


