import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ROUTER_PATHS } from '@shared/constants';
import { HeaderComponent } from '@shared/ui/header';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, TranslateModule],
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateHeaderComponent {
  protected readonly ROUTER_PATHS = ROUTER_PATHS;
}
