import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  CreateUserFormComponent,
  UsersListAbilityService,
} from "@features/users-list";
import { UserListComponent } from "@features/users-list";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-users-page",
  standalone: true,
  imports: [
    CommonModule,
    CreateUserFormComponent,
    TranslateModule,
    UserListComponent,
  ],
  providers: [UsersListAbilityService],
  templateUrl: "./users-page.component.html",
  styleUrl: "./users-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {
  public constructor(protected userAbilityService: UsersListAbilityService) {}
}
