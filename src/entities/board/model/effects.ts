import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { from, of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import { nanoid } from "nanoid";
import * as BoardActions from "./actions";

import { api } from "../../../shared/api";
import { BoardState } from "./store";
import { selectBoardById } from "./selectors";

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<BoardState>,
  ) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() =>
        from(api.getBoards()).pipe(
          map(boards => BoardActions.loadBoardsSuccess({ boards })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error }))),
        ),
      ),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createBoard),
      mergeMap(({ data }) => {
        const newBoard = { id: nanoid(), ...data, cols: [] };
        return from(api.createBoard(newBoard)).pipe(
          map(() => BoardActions.createBoardSuccess({ board: newBoard })),
          catchError(error => of(BoardActions.createBoardFailure({ error }))),
        );
      }),
    ),
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      switchMap(({ id, data }) =>
        this.store.pipe(
          select(selectBoardById(id)),
          take(1), // Only take the first emission and ignore subsequent ones
          switchMap(board => {
            if (!board) {
              // Return an error action if the board is not found
              return of(
                BoardActions.updateBoardFailure({ error: "Board not found" }),
              );
            }
            const updatedBoard = {
              ...board,
              ...data,
            } as api.BoardDto;
            return from(api.updateBoard(id, updatedBoard)).pipe(
              map(() =>
                BoardActions.updateBoardSuccess({ board: updatedBoard }),
              ),
              catchError(error =>
                of(BoardActions.updateBoardFailure({ error })),
              ),
            );
          }),
        ),
      ),
    ),
  );

  removeBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.removeBoard),
      mergeMap(({ id }) =>
        from(api.deleteBoard(id)).pipe(
          map(() => BoardActions.removeBoardSuccess({ id })),
          catchError(error => of(BoardActions.removeBoardFailure({ error }))),
        ),
      ),
    ),
  );
}
