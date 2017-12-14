import { Action } from '@ngrx/store';
import { Comment, AddClapRequest } from '../../models';

export enum CommentActionTypes {
  ADD_COMMENT = '[Comment] Add Comment',
  ADD_COMMENT_SUCCESS = '[Comment] Add Comment Success',
  ADD_COMMENT_FAIL = '[Post] Add Comment Fail'
}

export class AddComment implements Action {
  readonly type = CommentActionTypes.ADD_COMMENT;

  constructor(public payload: Comment) { }
}

export class AddCommentSuccess implements Action {
  readonly type = CommentActionTypes.ADD_COMMENT_SUCCESS;

  constructor(public payload: Comment) { }
}

export class AddCommentFail implements Action {
  readonly type = CommentActionTypes.ADD_COMMENT_FAIL;

  constructor(public payload: string) { }
}


export type CommentActions = AddComment | AddCommentSuccess | AddCommentFail;
