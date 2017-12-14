import { Action } from '@ngrx/store';
import { Clap, AddClapRequest } from '../../models';

export enum ClapActionTypes {
  ADD_CLAP = '[Clap] Add Clap',
  ADD_CLAP_SUCCESS = '[Clap] Add Clap Success'
}

export class AddClap implements Action {
  readonly type = ClapActionTypes.ADD_CLAP;

  constructor(public payload: AddClapRequest) { }
}

export class AddClapSuccess implements Action {
  readonly type = ClapActionTypes.ADD_CLAP_SUCCESS;

  constructor(public payload: Clap) {}
}

export type ClapActions = AddClap | AddClapSuccess;
