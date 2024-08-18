import { createReducer, on } from '@ngrx/store';
import { Session } from './types';
import * as SessionActions from './actions';

export interface SessionState {
  isLoading: boolean;
  currentSession?: Session;
  error?: any;
}

export const initialState: SessionState = {
  isLoading: false,
  currentSession: undefined,
  error: undefined,
};

export const sessionReducer = createReducer(
  initialState,
  on(SessionActions.loadSession, state => ({ ...state, isLoading: true })),
  on(SessionActions.loadSessionSuccess, (state, { session }) => ({
    ...state,
    currentSession: session,
    isLoading: false,
  })),
  on(SessionActions.loadSessionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(SessionActions.setCurrentSession, (state, { session }) => ({
    ...state,
    currentSession: session,
  })),
  on(SessionActions.removeSession, state => ({
    ...state,
    currentSession: undefined,
  })),
);
