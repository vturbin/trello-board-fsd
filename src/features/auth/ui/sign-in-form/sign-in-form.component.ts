import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SignInService } from "@features/auth";
import { TranslateModule } from "@ngx-translate/core";
import { api } from "@shared/api";
import { ButtonComponent } from "@shared/ui/button";
import { PasswordComponent } from "@shared/ui/password";
import { TextFieldComponent } from "@shared/ui/text-field";

@Component({
  selector: "app-sign-in-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordComponent,
    TextFieldComponent,
    ButtonComponent,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: "./sign-in-form.component.html",
  styleUrl: "./sign-in-form.component.scss",
  providers: [SignInService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  public loginFormGroup = new FormGroup({
    email: new FormControl<string>("", Validators.required),
    password: new FormControl<string>("", Validators.required),
  });

  public constructor(protected signInService: SignInService) {}

  public onSubmit() {
    if (this.loginFormGroup.valid) {
      this.signInService.signIn({
        email: this.loginFormGroup.value.email,
        password: this.loginFormGroup.value.password,
      } as api.SignInDto);
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
