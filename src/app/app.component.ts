import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextFieldComponent } from '../shared/ui/text-field/text-field.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { LogoComponent } from '../shared/ui/logo/logo.component';
import { PrimeIcons } from 'primeng/api';
import { IconComponent } from '../shared/ui/icon/icon.component';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';
import { PageSpinnerComponent } from '../shared/ui/page-spinner/page-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TextFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SpinnerComponent,
    PageSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.pageLoading = false;
      console.log(this.pageLoading);
    }, 1000);
  }
  title = 'trello-board-fsd';

  public readonly Icons = PrimeIcons;

  public pageLoading = true;

  public loginFormGroup = new FormGroup({
    login: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    password: new FormControl(null, Validators.required),
  });

  public buttonPressed(): void {
    console.log('button pressed');
  }
}
