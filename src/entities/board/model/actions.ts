import { createAction, props } from '@ngrx/store';
import { BoardPartial, CreateBoardData, UpdateBoardData } from './types';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: BoardPartial[] }>(),
);
export const loadBoardsFailure = createAction(
  '[Boards] Load Boards Failure',
  props<{ error: any }>(),
);

export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ data: CreateBoardData }>(),
);
export const createBoardSuccess = createAction(
  '[Boards] Create Board Success',
  props<{ board: BoardPartial }>(),
);
export const createBoardFailure = createAction(
  '[Boards] Create Board Failure',
  props<{ error: any }>(),
);

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ id: string; data: UpdateBoardData }>(),
);
export const updateBoardSuccess = createAction(
  '[Boards] Update Board Success',
  props<{ board: BoardPartial }>(),
);
export const updateBoardFailure = createAction(
  '[Boards] Update Board Failure',
  props<{ error: any }>(),
);

export const removeBoard = createAction(
  '[Boards] Remove Board',
  props<{ id: string }>(),
);
export const removeBoardSuccess = createAction(
  '[Boards] Remove Board Success',
  props<{ id: string }>(),
);
export const removeBoardFailure = createAction(
  '[Boards] Remove Board Failure',
  props<{ error: any }>(),
);
