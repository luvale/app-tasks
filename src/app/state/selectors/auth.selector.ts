import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoggedIn
);

export const getUsername = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.username
);