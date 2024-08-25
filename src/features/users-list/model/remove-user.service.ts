import { Injectable } from "@angular/core";
import {
  removeUserFailure,
  removeUserSuccess,
  selectIsLoading,
} from "@entities/user";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { api } from "@shared/api";
import { ToastService } from "@shared/ui/toast";
import { ConfirmationService, PrimeIcons } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class RemoveUserService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private store: Store,
    private confirmationService: ConfirmationService,
  ) {}

  public async removeUser(userId: string): Promise<void> {
    console.log(userId);
    this.confirmationService.confirm({
      message: this.translateService.instant(
        "remove-user-confirmation.message",
      ),
      header: this.translateService.instant("remove-user-confirmation.header"),
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      rejectButtonStyleClass: "p-button-text",
      acceptButtonStyleClass: "p-button-danger",
      acceptLabel: this.translateService.instant("yes"),
      acceptIcon: "none",
      rejectIcon: this.translateService.instant("no"),
      accept: () => {
        this.isLoading$.next(true);

        api
          .deleteUser(userId)
          .then(() => {
            this.store.dispatch(removeUserSuccess({ userId }));
            const summary = this.translateService.instant("user-deletion");
            const text = this.translateService.instant("user-deletion-success");
            this.toastService.showSuccess(summary, text);
          })
          .catch(error => {
            this.store.dispatch(removeUserFailure({ error }));
            const summary = this.translateService.instant("user-deletion");
            const text = this.translateService.instant("user-deletion-failure");
            this.toastService.showError(summary, text);
          })
          .finally(() => this.isLoading$.next(false));
      },
    });
  }
}
