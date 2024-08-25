import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RemoveUserService } from "../../model/remove-user.service";
import { ButtonComponent, ButtonSeverity } from "@shared/ui/button";
import { SpinnerComponent } from "@shared/ui/spinner";
import { PrimeIcons } from "primeng/api";

@Component({
  selector: "app-remove-user-button",
  standalone: true,
  imports: [CommonModule, ButtonComponent, SpinnerComponent],
  providers: [RemoveUserService],
  templateUrl: "./remove-user-button.component.html",
  styleUrl: "./remove-user-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveUserButtonComponent {
  @Input({ required: true })
  public userId!: string;

  public readonly icons = PrimeIcons;

  public readonly buttonSeverity = ButtonSeverity;

  public constructor(protected removeUserService: RemoveUserService) {}

  public removeUser(): void {
    this.removeUserService.removeUser(this.userId);
  }
}
