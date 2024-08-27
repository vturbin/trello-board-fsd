import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RemoveBoardService } from "@features/board-list/model/remove-board.service";
import { ButtonComponent, ButtonSeverity } from "@shared/ui/button";
import { SpinnerComponent } from "@shared/ui/spinner";
import { PrimeIcons } from "primeng/api";

@Component({
  selector: "app-remove-board-button",
  standalone: true,
  imports: [CommonModule, ButtonComponent, SpinnerComponent],
  providers: [RemoveBoardService],
  templateUrl: "./remove-board-button.component.html",
  styleUrl: "./remove-board-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveBoardButtonComponent {
  @Input({ required: true })
  public boardId!: string;

  public readonly icons = PrimeIcons;

  public readonly buttonSeverity = ButtonSeverity;

  public constructor(private removeBoardService: RemoveBoardService) {}

  public removeBoard(): void {
    this.removeBoardService.remove(this.boardId);
  }
}
