import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextFieldComponent } from '../shared/ui/text-field/text-field.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextFieldComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'trello-board-fsd';

  public loginFormGroup = new FormGroup({
    login: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    password: new FormControl(null, Validators.required),
  });
}
