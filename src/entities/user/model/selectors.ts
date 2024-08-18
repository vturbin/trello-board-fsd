import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './store';
import { User } from './types';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  state => state.users,
);

export const selectUserById = (userId: string) =>
  createSelector(selectUsersState, state =>
    state.users.find(user => user.id === userId),
  );

export const selectUsersMap = createSelector(selectUsersState, state =>
  state.users.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<string, User>,
  ),
);

export const selectIsLoading = createSelector(
  selectUsersState,
  state => state.loading,
);

export const selectUsersError = createSelector(
  selectUsersState,
  state => state.error,
);
