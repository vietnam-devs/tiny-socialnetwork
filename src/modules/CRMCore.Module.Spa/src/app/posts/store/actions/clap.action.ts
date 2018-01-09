import { Action } from '@ngrx/store';
import { Clap, AddClapRequest } from '../../models';

// action constants
export const ADD_CLAP = '[Clap] Add Clap';
export const ADD_CLAP_SUCCESS = '[Clap] Add Clap Success';

// action creators
export class AddClap implements Action {
  readonly type = ADD_CLAP;
  constructor(public payload: AddClapRequest) { }
};
export class AddClapSuccess implements Action {
  readonly type = ADD_CLAP_SUCCESS;
  constructor(public payload: Clap) {}
}

// action types
export type ClapAction = AddClap 
                        | AddClapSuccess;
