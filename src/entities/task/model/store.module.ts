import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './effects';
import { tasksReducer } from './store';

@NgModule({
  imports: [
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
})
export class TasksStoreModule {}
