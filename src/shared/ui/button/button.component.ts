import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonSeverity } from './button-severity.enum';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public label = '';

  @Input()
  public severity: ButtonSeverity = ButtonSeverity.None;

  @Input()
  public disabled: boolean = false;

  @Input()
  public outlined: boolean = false;

  @Input()
  public loading: boolean = false;

  @Input()
  public icon: PrimeIcons | undefined = undefined;

  @Output()
  public onClick = new EventEmitter();
}
