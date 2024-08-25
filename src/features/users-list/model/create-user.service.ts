import { Injectable } from "@angular/core";
import {
  CreateUserData,
  createUserFailure,
  createUserSuccess,
} from "@entities/user";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { api } from "@shared/api";
import { ToastService } from "@shared/ui/toast";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CreateUserService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private store: Store,
  ) {}

  public createUser(createUserData: CreateUserData): Promise<void> {
    this.isLoading$.next(true);
    return api
      .createUser(createUserData)
      .then(user => {
        this.store.dispatch(createUserSuccess({ user }));
        const summary = this.translateService.instant("user-creation");
        const text = this.translateService.instant("user-creation-success");
        this.toastService.showSuccess(summary, text);
      })
      .catch(error => {
        this.store.dispatch(createUserFailure({ error }));
        const summary = this.translateService.instant("user-creation");
        const text = this.translateService.instant("user-creation-failure");
        this.toastService.showError(summary, text);
      })
      .finally(() => this.isLoading$.next(false));
  }
}
