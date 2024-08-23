import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boards-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boards-page.component.html',
  styleUrl: './boards-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPageComponent {}
