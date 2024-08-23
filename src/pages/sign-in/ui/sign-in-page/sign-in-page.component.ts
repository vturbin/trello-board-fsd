import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInFormComponent } from '@features/auth/ui/sign-in-form/sign-in-form.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, TranslateModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {}
