import { Action } from '@ngrx/store';

import { PaginatedItem } from '../../../shared_state/models/paginateditem.model';
import { Post } from '../../models/post.model';

export const LOAD = '[Post] Load';
export const LOAD_SUCCESS = '[Post] Load Success';
export const LOAD_FAIL = '[Post] Load Fail';

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload: Post[]) {}
  }
  
  export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: PaginatedItem<Post>) {}
  }
  
  export class LoadFail implements Action {
    readonly type = LOAD_FAIL;
  
    constructor(public payload: any) {}
  }

  export type Actions =
  | Load
  | LoadSuccess
  | LoadFail;
  