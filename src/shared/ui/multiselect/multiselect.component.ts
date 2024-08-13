import { CommonModule } from '@angular/common';
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

import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  imports: [CommonModule, MultiSelectModule, ReactiveFormsModule],
  hostDirectives: [NoopValueAccessorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectComponent<T> {
  @Input({ required: true }) public placeholder!: string;

  @Input({ required: true }) public options!: T[];

  @Input({ required: true }) public optionLabel!: string;

  @Input() public vertical = false;

  @Input() public label?: string;

  @Input() public labelWidth = '7rem';

  @Input() public clearable?: boolean;

  @Output() onSelect: EventEmitter<T> = new EventEmitter();

  @Output() onClear: EventEmitter<void> = new EventEmitter();

  public ngControl = injectNgControl();
}
