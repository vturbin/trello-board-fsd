import { createReducer, on } from '@ngrx/store';
import { User } from './types';
import * as UsersActions from './actions';

export interface UsersState {
  users: User[];
  error?: any;
  loading: boolean;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: undefined,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.createUser, state => ({ ...state, loading: true })),
  on(UsersActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.removeUser, state => ({ ...state, loading: true })),
  on(UsersActions.removeUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
    loading: false,
  })),
  on(UsersActions.removeUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
