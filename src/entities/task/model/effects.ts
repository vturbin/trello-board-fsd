import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TasksActions from './actions';
import { Task } from './types';
import { api } from '../../../shared/api';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        from(api.getTasks()).pipe(
          map((tasks: Task[]) => TasksActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TasksActions.loadTasksFailure({ error }))),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      mergeMap(({ data }) =>
        from(api.createTask(data)).pipe(
          map((task: Task) => TasksActions.createTaskSuccess({ task })),
          catchError(error => of(TasksActions.createTaskFailure({ error }))),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ id, data }) =>
        from(api.getTaskById(id)).pipe(
          mergeMap((task: Task | undefined) => {
            if (!task) {
              return of(
                TasksActions.updateTaskFailure({ error: 'Task not found' }),
              );
            }
            const updatedTask = { ...task, ...data };
            return from(api.updateTask(id, data)).pipe(
              map(() => TasksActions.updateTaskSuccess({ task: updatedTask })),
              catchError(error =>
                of(TasksActions.updateTaskFailure({ error })),
              ),
            );
          }),
        ),
      ),
    ),
  );

  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.removeTask),
      mergeMap(({ userId }) =>
        from(api.deleteTask(userId)).pipe(
          map(() => TasksActions.removeTaskSuccess({ userId })),
          catchError(error => of(TasksActions.removeTaskFailure({ error }))),
        ),
      ),
    ),
  );
}
