import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-logo.component.html',
  styleUrl: './ui-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLogoComponent {
  @Input()
  public className: string = '';
}
