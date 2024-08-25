import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "@shared/ui/button";
import { CreateBoardModalComponent } from "../create-board-modal/create-board-modal.component";

@Component({
  selector: "app-create-board-button",
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TranslateModule,
    CreateBoardModalComponent,
  ],
  templateUrl: "./create-board-button.component.html",
  styleUrl: "./create-board-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardButtonComponent {
  public modelOpen = false;
}
