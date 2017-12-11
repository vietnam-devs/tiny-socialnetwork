import { Action } from '@ngrx/store';

import { PaginatedItem } from '../../../shared/models/paginateditem.model';
import { Post, Comment } from '../../models';
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

export class Get implements Action {
  readonly type = ActionType.GET_POST;

  constructor(public payload: string) {}
}

export class AddComment implements Action {
  readonly type = ActionType.ADD_COMMENT;

  constructor(public payload: Comment) {}
}


export class AddPost1 implements Action {
  readonly type = ActionType.ADD_POST;

  constructor(public payload: Post) {}
}

export const PostActionCreators = {
  load: (): Action => (<Load>{ type: ActionType.LOAD }),

  loadStarted: (): Action => (<LoadStarted>{ type: ActionType.LOAD_STARTED }),

  loadSuccess: (payload: any): Action => (<LoadSuccess>{ type: ActionType.LOAD_SUCCESS, payload }),

  loadFail: (payload: any): Action => (<any>{ type: ActionType.LOAD_FAIL, payload }),

  addPost: (payload: any): Action => (<AddPost>{ type: ActionType.ADD_POST, payload }),

  addPostSucess: (payload: any): Action => (<AddPostSuccess>{ type: ActionType.ADD_POST_SUCCESS, payload }),

  addPostFail: (payload: any): Action => (<any>{ type: ActionType.ADD_POST_FAIL, payload })
};

export type Actions = Load 
                      | LoadStarted 
                      | LoadSuccess
                      | LoadFail 
                      | Get 
                      | AddComment 
                      | AddPost
                      | AddPostSuccess 
                      | AddPostFail
                      | AddPost1;


