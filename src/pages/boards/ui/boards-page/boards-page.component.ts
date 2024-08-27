import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  BoardListComponent,
  CreateBoardButtonComponent,
} from "@features/board-list";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-boards-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CreateBoardButtonComponent,
    BoardListComponent,
  ],
  templateUrl: "./boards-page.component.html",
  styleUrl: "./boards-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPageComponent {}
