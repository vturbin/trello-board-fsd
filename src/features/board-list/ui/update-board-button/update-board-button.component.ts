import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BoardPartial } from "@entities/board";
import { ButtonComponent, ButtonSeverity } from "@shared/ui/button";
import { PrimeIcons } from "primeng/api";
import { UpdateBoardModalComponent } from "../update-board-modal/update-board-modal.component";

@Component({
  selector: "app-update-board-button",
  standalone: true,
  imports: [CommonModule, ButtonComponent, UpdateBoardModalComponent],
  templateUrl: "./update-board-button.component.html",
  styleUrl: "./update-board-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBoardButtonComponent {
  @Input({ required: true })
  public board!: BoardPartial;

  public modelOpen = false;

  protected readonly icons = PrimeIcons;

  protected readonly buttonSeverity = ButtonSeverity;
}
