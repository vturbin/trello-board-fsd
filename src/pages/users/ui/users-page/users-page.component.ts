import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UsersListAbilityService } from "@features/users-list";
import { CreateUserFormComponent } from "@features/users-list/ui/create-user-form/create-user-form.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-users-page",
  standalone: true,
  imports: [CommonModule, CreateUserFormComponent, TranslateModule],
  providers: [UsersListAbilityService],
  templateUrl: "./users-page.component.html",
  styleUrl: "./users-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {
  public constructor(protected userAbilityService: UsersListAbilityService) {}
}
