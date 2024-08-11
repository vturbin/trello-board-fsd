import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  styleUrls: ['./page-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSpinnerComponent implements OnChanges, OnDestroy {
  @Input() isLoading: boolean | undefined;
  @Input() className: string = '';

  isShown: boolean = true;
  private timeout: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading']) {
      if (this.isLoading) {
        this.timeout = setTimeout(() => {
          this.isShown = true;
        }, 500); // Appearance delay of 500ms
      } else {
        clearTimeout(this.timeout);
        this.isShown = false;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
