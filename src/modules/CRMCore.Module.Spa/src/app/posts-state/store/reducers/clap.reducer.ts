import * as fromAction  from '../actions';
import { Clap } from '../../models';

export interface State {
  entities: { [id: string]: Clap };
}

const initialState: State = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: fromAction.ClapAction | fromAction.PostAction
): State {
  switch (action.type) {
    case fromAction.LOAD_SUCCESS: {
      return {...state, entities: { ...state.entities, ...action.payload.entities.claps }};
    }
    case fromAction.ADD_CLAP_SUCCESS: {
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

