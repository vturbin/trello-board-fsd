import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  /** Requires font size string in rem or px, i.e '1.5rem' */
  @Input()
  public fontSize?: string;

  /** Requires color in string, i.e hashcode '#708090' or 'blue'  */
  @Input()
  public color?: string;
}
