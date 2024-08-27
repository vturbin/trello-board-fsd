import { Injectable } from "@angular/core";
import { removeBoardFailure, removeBoardSuccess } from "@entities/board";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { api } from "@shared/api";
import { ToastService } from "@shared/ui/toast";
import { ConfirmationService, PrimeIcons } from "primeng/api";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RemoveBoardService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private store: Store,
    private confirmationService: ConfirmationService,
  ) {}

  public async remove(boardId: string): Promise<void> {
    this.confirmationService.confirm({
      message: this.translateService.instant(
        "remove-board-confirmation.message",
      ),
      header: this.translateService.instant("remove-board-confirmation.header"),
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      rejectButtonStyleClass: "p-button-text",
      acceptButtonStyleClass: "p-button-danger",
      acceptLabel: this.translateService.instant("yes"),
      acceptIcon: "none",
      rejectIcon: this.translateService.instant("no"),
      accept: () => {
        this.isLoading$.next(true);

        api
          .deleteBoard(boardId)
          .then(() => {
            this.store.dispatch(removeBoardSuccess({ id: boardId }));
            const summary = this.translateService.instant("board-deletion");
            const text = this.translateService.instant(
              "board-deletion-success",
            );
            this.toastService.showSuccess(summary, text);
          })
          .catch(error => {
            this.store.dispatch(removeBoardFailure({ error }));
            const summary = this.translateService.instant("board-deletion");
            const text = this.translateService.instant(
              "board-deletion-failure",
            );
            this.toastService.showError(summary, text);
          })
          .finally(() => this.isLoading$.next(false));
      },
    });
  }
}
