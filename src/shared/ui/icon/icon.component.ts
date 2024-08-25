import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PrimeIcons } from "primeng/api";

@Component({
  selector: "app-icon",
  standalone: true,
  templateUrl: "./icon.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true })
  public icon!: PrimeIcons;

  /** Requires font size string in rem or px, i.e '1.5rem' */
  @Input()
  public fontSize?: string;

  /** Requires color in string, i.e hashcode '#708090' or 'blue'  */
  @Input()
  public color?: string;
}
