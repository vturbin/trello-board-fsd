import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SignOutButtonComponent } from "@features/auth";
import { TranslateModule } from "@ngx-translate/core";
import { ROUTER_PATHS } from "@shared/constants";
import { HeaderComponent } from "@shared/ui/header";
import { ProfileComponent } from "../profile/profile.component";
import { UpdateLangDropdownComponent } from "@features/i18n";

@Component({
  selector: "app-private-header",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    TranslateModule,
    SignOutButtonComponent,
    ProfileComponent,
    UpdateLangDropdownComponent,
  ],
  templateUrl: "./private-header.component.html",
  styleUrl: "./private-header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateHeaderComponent {
  protected readonly ROUTER_PATHS = ROUTER_PATHS;
}
