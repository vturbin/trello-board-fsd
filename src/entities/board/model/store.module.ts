import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './effects';
import { boardReducer } from './store';

@NgModule({
  imports: [
    StoreModule.forFeature('boards', boardReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardStoreModule {}
