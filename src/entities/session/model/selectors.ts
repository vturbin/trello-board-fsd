import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SessionState } from './store';

export const selectSessionState =
  createFeatureSelector<SessionState>('session');

export const selectIsLoading = createSelector(
  selectSessionState,
  state => state.isLoading,
);

export const selectCurrentSession = createSelector(
  selectSessionState,
  state => state.currentSession,
);

export const selectSessionError = createSelector(
  selectSessionState,
  state => state.error,
);
