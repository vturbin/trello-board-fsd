import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  loadUsers,
  selectAllUsers,
  User,
  UserPreviewComponent,
} from "@entities/user";
import { UsersListAbilityService } from "@features/users-list";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { RemoveUserButtonComponent } from "../remove-user-button/remove-user-button.component";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, UserPreviewComponent, RemoveUserButtonComponent],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public users$: Observable<User[]>;

  public constructor(
    private store: Store,
    protected userAbilityService: UsersListAbilityService,
  ) {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectAllUsers);
    // this.users$.subscribe(users => console.log(users));
  }
}
