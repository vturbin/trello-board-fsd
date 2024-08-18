import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TasksState } from './store';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  state => state.tasks,
);

export const selectTaskById = (id: string) =>
  createSelector(selectTasksState, state =>
    state.tasks.find(task => task.id === id),
  );

export const selectIsLoading = createSelector(
  selectTasksState,
  state => state.loading,
);

export const selectTasksError = createSelector(
  selectTasksState,
  state => state.error,
);
