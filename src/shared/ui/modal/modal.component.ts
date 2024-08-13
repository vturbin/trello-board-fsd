import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() display: boolean = false;

  @Output() onClose = new EventEmitter<void>();

  // These will hold references to the templates provided by the parent component
  @ContentChild('header', { static: false }) headerTemplate?: TemplateRef<any>;
  @ContentChild('body', { static: false }) bodyTemplate?: TemplateRef<any>;
  @ContentChild('footer', { static: false }) footerTemplate?: TemplateRef<any>;

  closeModal() {
    this.display = false;
    this.onClose.emit();
  }
}
