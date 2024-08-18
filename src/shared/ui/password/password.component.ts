import { CommonModule, KeyValuePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NoopValueAccessorDirective } from '../../utils/directives/NoopValueAccessorDirective';
import { injectNgControl } from '../../utils/ng-control-injector';
import { ReactiveFormsModule } from '@angular/forms';
import { MapErrorToTextPipe } from '../../utils/pipes/map-error-to-text.pipe';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KeyValuePipe,
    MapErrorToTextPipe,
    NgClass,
    PasswordModule,
  ],
  templateUrl: './password.component.html',
  hostDirectives: [NoopValueAccessorDirective],
  styleUrl: './password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent {
  @Input({ required: true }) public label!: string;
  @Input() public feedback: boolean = false;
  @Input() public labelWidth = '7rem';
  @Input() public inputWidth = '100%';
  @Input() public vertical = false;

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  public ngControl = injectNgControl();
}
