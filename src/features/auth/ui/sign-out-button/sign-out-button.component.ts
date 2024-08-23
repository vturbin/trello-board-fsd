import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { removeSession } from "@entities/session";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { api } from "@shared/api";
import { ButtonComponent } from "@shared/ui/button";

@Component({
  selector: "app-sign-out-button",
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule],
  templateUrl: "./sign-out-button.component.html",
  styleUrl: "./sign-out-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignOutButtonComponent {
  public isLoading = false;

  public constructor(private store: Store) {}

  public async signOut(): Promise<void> {
    this.isLoading = true;
    await api.signOut().finally(() => (this.isLoading = false));
    this.store.dispatch(removeSession());
  }
}
