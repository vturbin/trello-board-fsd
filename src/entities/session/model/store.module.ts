import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './effects';
import { sessionReducer } from './store';

@NgModule({
  imports: [
    StoreModule.forFeature('session', sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
  ],
})
export class SessionStoreModule {}
