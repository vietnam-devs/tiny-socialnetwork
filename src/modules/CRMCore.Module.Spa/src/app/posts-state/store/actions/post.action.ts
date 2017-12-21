import { Action } from '@ngrx/store';
import { Post } from '../../models';
/*--------------------------------------------------LOAD POST--------------------------------------------------- */
// action constants
export const LOAD = '[Post] Load';
export const LOAD_STARTED = '[Post] Load Started';
export const LOAD_SUCCESS = '[Post] Load Success';
export const LOAD_FAIL = '[Post] Load Fail';

// action creators
export class Load implements Action {
  readonly type = LOAD;
};
export class LoadStarted implements Action {
  readonly type = LOAD_STARTED;
};
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: any) {}
};
export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload:any) {}
};
/*---------------------------------------------------ADD POST-------------------------------------------------- */
// action constants
export const ADD_POST = '[Post] Add Post';
export const ADD_POST_SUCCESS = '[Post] Add Post Success';
export const ADD_POST_FAIL = '[Post] Add Post Fail';

// action creators
export class AddPost implements Action {
  readonly type = ADD_POST;
  constructor(public payload:Post) {}
};
export class AddPostSuccess implements Action {
  readonly type = ADD_POST_SUCCESS;
  constructor(public payload:Post) {}
};
export class AddPostFail implements Action {
  readonly type = ADD_POST_FAIL;
  constructor(public payload:any) {}
};

/*---------------------------------------------------REMOVE POST-------------------------------------------------- */
 // action constants
export const REMOVE_POST = '[Post] Remove Post';
export const REMOVE_POST_SUCCESS = 'Post] Remove Post Success';
export const REMOVE_POST_FAIL = '[Post] Remove Post Fail';

// action creators
export class RemovePost implements Action {
  readonly type = REMOVE_POST;
  constructor(public payload:string) {}
};
export class RemovePostSuccess implements Action {
  readonly type = REMOVE_POST_SUCCESS;
  constructor(public payload:string) {}
};
export class RemovePostFail implements Action {
  readonly type = REMOVE_POST_FAIL;
  constructor(public payload:string) {}
};

/*---------------------------------------------------GET POST-------------------------------------------------- */
// action constants
export const GET_POST_BY_ID = '[Post] Get Post By ID';
export const GET_POST_BY_ID_SUCCESS = '[Post] Get Post By ID Success';
export const GET_POST_BY_ID_FAIL = '[Post] Get Post By ID Fail';

// action creators
export class GetPostById implements Action {
  readonly type = GET_POST_BY_ID;
  constructor(public payload:string) {}
};


/*---------------------------------------------------ACTION TYPE-------------------------------------------------- */

export type PostAction = Load
                      | LoadStarted
                      | LoadSuccess
                      | LoadFail                     
                      | AddPost
                      | AddPostSuccess
                      | AddPostFail
                      | RemovePost
                      | RemovePostSuccess
                      | GetPostById ;


