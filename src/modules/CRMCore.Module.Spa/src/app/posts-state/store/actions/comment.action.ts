import { Action } from '@ngrx/store';
import { Comment } from '../../models';

// action constants
 export const ADD_COMMENT = '[Comment] Add Comment';
 export const ADD_COMMENT_SUCCESS = '[Comment] Add Comment Success';
 export const ADD_COMMENT_FAIL = '[Post] Add Comment Fail';

// action creators
export class AddComment implements Action {
  readonly type = ADD_COMMENT;
  constructor(public payload: Comment) { }
};
export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: Comment) { }
};
export class AddCommentFail implements Action {
  readonly type = ADD_COMMENT_FAIL;
  constructor(public payload: string) { }
};

// action types
export type CommentAction = AddComment 
                            | AddCommentSuccess 
                            | AddCommentFail;
