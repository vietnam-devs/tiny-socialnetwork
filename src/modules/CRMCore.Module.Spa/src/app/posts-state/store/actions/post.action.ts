import { Action } from '@ngrx/store';

import { PaginatedItem } from '../../../shared/models/paginateditem.model';
import { Post } from '../../models/post.model';

export const LOAD = '[Post] Load';
export const LOAD_STARTED = '[Post] Load Started';
export const LOAD_SUCCESS = '[Post] Load Success';
export const LOAD_FAIL = '[Post] Load Fail';

interface Load extends Action {
  type: typeof LOAD;
}

interface LoadStarted extends Action {
  type: typeof LOAD_STARTED;
}

interface LoadSuccess extends Action {
  type: typeof LOAD_SUCCESS;
  payload: PaginatedItem<Post>;
}

interface LoadFail extends Action {
  type: typeof LOAD_FAIL;
  payload: any;
}

export const PostActionCreators = {
  load: (): Action => <Load>{ type: LOAD },

  loadStarted: (): Action => <LoadStarted>{ type: LOAD_STARTED },

  loadSuccess: (payload: PaginatedItem<Post>): Action => <LoadSuccess>{ type: LOAD_SUCCESS, payload },

  loadFail: (payload: any): Action => <any>{ type: LOAD_FAIL, payload }
};

export type Actions = Load | LoadStarted | LoadSuccess | LoadFail;
