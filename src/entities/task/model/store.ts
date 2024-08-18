import { createReducer, on } from '@ngrx/store';
import { Task } from './types';
import * as TasksActions from './actions';

export interface TasksState {
  tasks: Task[];
  error?: any;
  loading: boolean;
}

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: undefined,
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({ ...state, loading: true })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TasksActions.createTask, state => ({ ...state, loading: true })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false,
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TasksActions.updateTask, state => ({ ...state, loading: true })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    loading: false,
  })),
  on(TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TasksActions.removeTask, state => ({ ...state, loading: true })),
  on(TasksActions.removeTaskSuccess, (state, { userId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== userId),
    loading: false,
  })),
  on(TasksActions.removeTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
