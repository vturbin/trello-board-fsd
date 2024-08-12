import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { NoopValueAccessorDirective } from '../../utils/directives/NoopValueAccessorDirective';
import { injectNgControl } from '../../utils/ng-control-injector';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent<T> {
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
