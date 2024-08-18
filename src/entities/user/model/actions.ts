import { createAction, props } from '@ngrx/store';
import { CreateUserData, User } from './types';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>(),
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>(),
);

export const createUser = createAction(
  '[Users] Create User',
  props<{ data: CreateUserData }>(),
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>(),
);
export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: any }>(),
);

export const removeUser = createAction(
  '[Users] Remove User',
  props<{ userId: string }>(),
);
export const removeUserSuccess = createAction(
  '[Users] Remove User Success',
  props<{ userId: string }>(),
);
export const removeUserFailure = createAction(
  '[Users] Remove User Failure',
  props<{ error: any }>(),
);

export const getUserById = createAction(
  '[Users] Get User By Id',
  props<{ userId: string }>(),
);
