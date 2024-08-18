import { createAction, props } from '@ngrx/store';
import { Task, CreateTaskData, UpdateTaskData } from './types';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: any }>(),
);

export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ data: CreateTaskData }>(),
);
export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>(),
);
export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: any }>(),
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ id: string; data: UpdateTaskData }>(),
);
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>(),
);
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: any }>(),
);

export const removeTask = createAction(
  '[Tasks] Remove Task',
  props<{ userId: string }>(),
);
export const removeTaskSuccess = createAction(
  '[Tasks] Remove Task Success',
  props<{ userId: string }>(),
);
export const removeTaskFailure = createAction(
  '[Tasks] Remove Task Failure',
  props<{ error: any }>(),
);

export const getTaskById = createAction(
  '[Tasks] Get Task By Id',
  props<{ id: string }>(),
);
