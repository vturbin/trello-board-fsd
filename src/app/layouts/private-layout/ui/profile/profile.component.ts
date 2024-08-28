import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { selectCurrentSession, Session } from "@entities/session";
import { getAvatarUrl } from "@entities/user";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public getAvatarUrl = getAvatarUrl;
  public currentSession$: Observable<Session | undefined>;

  public constructor(private store: Store) {
    this.currentSession$ = this.store.select(selectCurrentSession);
  }
}
