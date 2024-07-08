import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { injectNgControl } from '../../utils/ng-control-injector';
import { NoopValueAccessorDirective } from '../../utils/directives/NoopValueAccessorDirective';
import { KeyValuePipe, NgClass } from '@angular/common';
import { MapErrorToTextPipe } from '../../utils/pipes/map-error-to-text.pipe';

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    KeyValuePipe,
    MapErrorToTextPipe,
    NgClass,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input({ required: true }) public label!: string;
  @Input() public labelWidth = '7rem';
  @Input() public inputWidth = '100%';
  @Input() public vertical = false;

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  public ngControl = injectNgControl();
}
