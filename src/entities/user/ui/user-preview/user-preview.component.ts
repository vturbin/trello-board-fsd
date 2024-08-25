import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { getAvatarUrl } from "../get-avatar-url";

@Component({
  selector: "app-user-preview",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-preview.component.html",
  styleUrl: "./user-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public avatarId!: string;

  @Input()
  public size: "sm" | "md" | "lg" = "md";

  public getAvatarUrl = getAvatarUrl;
}
