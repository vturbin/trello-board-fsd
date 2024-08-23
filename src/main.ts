import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import('@shared/api/msw')
  .then(worker => worker.initWorker())
  .then(worker => worker.start())
  .then(() => {
    bootstrapApplication(AppComponent, appConfig).catch(err =>
      console.error(err),
    );
  });
