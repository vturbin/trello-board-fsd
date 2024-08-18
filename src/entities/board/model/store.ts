import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BoardPartial } from './types';
import * as BoardActions from './actions';

export interface BoardState extends EntityState<BoardPartial> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<BoardPartial> =
  createEntityAdapter<BoardPartial>();

export const initialState: BoardState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadBoards, state => ({ ...state, loading: true })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) =>
    adapter.setAll(boards, { ...state, loading: false }),
  ),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BoardActions.createBoardSuccess, (state, { board }) =>
    adapter.addOne(board, state),
  ),
  on(BoardActions.updateBoardSuccess, (state, { board }) =>
    adapter.upsertOne(board, state),
  ),
  on(BoardActions.removeBoardSuccess, (state, { id }) =>
    adapter.removeOne(id, state),
  ),
);
