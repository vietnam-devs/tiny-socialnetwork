import { ClapActions, ClapActionTypes } from '../actions/clap.action';
import * as postActions from '../actions/post.action';
import * as PostActionTypes from '../actions/post-constant-type.action';
import { Clap } from '../../models';

export interface State {
  entities: { [id: string]: Clap };
}

const initialState: State = {
  entities: {}
};


export function reducer(
  state = initialState,
  action: ClapActions | postActions.Actions
): State {
  switch (action.type) {

    case PostActionTypes.LOAD_SUCCESS: {
      return {...state, entities: { ...state.entities, ...action.payload.entities.claps }};
    }

    case ClapActionTypes.ADD_CLAP_SUCCESS: {
      return {
        ...state, 
        entities: {
          ...state.entities,
          [action.payload.id] : action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}


export const getClaps = (state: State) => state.entities;
