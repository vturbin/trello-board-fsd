import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { getAvatarUrl } from "../get-avatar-url";

@Component({
  selector: "app-avatar-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./avatar-list.component.html",
  styleUrl: "./avatar-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarListComponent {
  @Input({ required: true })
  public avatarIds: string[] = [];

  public getAvatarUrl = getAvatarUrl;
}
