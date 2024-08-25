import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-image-select",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-select.component.html",
  styleUrl: "./image-select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSelectComponent<T> {
  @Input() className?: string;
  @Input() label?: string;
  @Input() error?: string;
  @Input() value?: T | null;
  @Input() images: T[] = [];
  @Input() getSrc!: (value: T) => string;
  @Output() onChange = new EventEmitter<T>();

  public onSelect(image: T): void {
    this.value = image;
    this.onChange.emit(image);
  }
}
