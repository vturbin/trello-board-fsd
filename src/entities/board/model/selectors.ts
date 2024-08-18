import { createSelector, createFeatureSelector } from '@ngrx/store';
import { adapter, BoardState } from './boards.store';

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const selectAllBoards = createSelector(selectBoardState, selectAll);

export const selectBoardById = (id: string) =>
  createSelector(selectAllBoards, boards =>
    boards.find(board => board.id === id),
  );
