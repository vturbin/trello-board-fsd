import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, setCurrentSession } from '@entities/session';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { api } from '@shared/api';
import { ROUTER_PATHS } from '@shared/constants';
import { ToastService } from '@shared/ui/toast/toast.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SignInService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public error$ = new BehaviorSubject<string | undefined>(undefined);

  public constructor(
    private store: Store,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {}

  public signIn(signInDto: api.SignInDto) {
    this.isLoading$.next(true);
    api
      .signIn(signInDto)
      .then(session => {
        this.store.dispatch(setCurrentSession({ session }));
        this.toastService.showSuccess(
          this.translateService.instant('sign-in'),
          this.translateService.instant('sign-in-success'),
        );
        this.router.navigate([ROUTER_PATHS.BOARDS]);
        return session;
      })
      .catch(() => {
        this.error$.next(this.translateService.instant('sign-in-error'));
      })
      .finally(() => {
        this.isLoading$.next(false);
      });
  }
}
