import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { loginSuccess } from '../actions/auth.actions';
import { AppState } from '../app.state';
import { AuthState } from '../../models/auth.model';

export const initialState: AuthState = {
  isLoggedIn: false,
  username: ''
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { username }) => ({ 
    ...state, isLoggedIn: true, username 
  })),
);

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};