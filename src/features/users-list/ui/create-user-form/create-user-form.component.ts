import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateUserData, getAvatarUrl } from "@entities/user";
import { CreateUserService } from "@features/users-list";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { UserRole } from "@shared/api/generated";
import { ButtonComponent } from "@shared/ui/button";
import { DropdownComponent } from "@shared/ui/dropdown";
import { ImageSelectComponent } from "@shared/ui/image-select";
import { PasswordComponent } from "@shared/ui/password";
import { TextFieldComponent } from "@shared/ui/text-field";

@Component({
  selector: "app-create-user-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    DropdownComponent,
    PasswordComponent,
    TranslateModule,
    ImageSelectComponent,
    ButtonComponent,
  ],
  templateUrl: "./create-user-form.component.html",
  styleUrl: "./create-user-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateUserService],
})
export class CreateUserFormComponent {
  public userRoles: { id: UserRole; label: string }[];
  public createUserFormGroup: FormGroup;
  public images = Array.from({ length: 8 }, (_, i) => i + 1);
  public avatarUrl = getAvatarUrl;

  public constructor(
    private translate: TranslateService,
    protected createUserService: CreateUserService,
    private formBuilder: FormBuilder,
  ) {
    this.userRoles = [
      { id: UserRole.admin, label: "Admin" },
      { id: UserRole.user, label: this.translate.instant("user-roles.user") },
    ];
    this.createUserFormGroup = this.formBuilder.group({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      role: new FormControl<{ id: UserRole; label: string } | null>({
        id: UserRole.user,
        label: this.translate.instant("user-roles.user"),
      }),
      avatarId: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  public handleImageChange(image: string | number): void {
    this.createUserFormGroup.controls.avatarId.setValue(image);
  }

  public async submitUser(): Promise<void> {
    this.createUserFormGroup.markAllAsTouched();
    if (this.createUserFormGroup.valid) {
      const userData: CreateUserData = this.mapUserFormToUserData();
      this.createUserService.createUser(userData).then(() => {
        this.setControlsToInitialValues();
      });
    }
  }

  private mapUserFormToUserData(): CreateUserData {
    return {
      ...this.createUserFormGroup.value,
      role: this.createUserFormGroup.controls.role.value.id,
      avatarId: String(this.createUserFormGroup.controls.avatarId.value),
    };
  }

  private setControlsToInitialValues(): void {
    this.createUserFormGroup.reset();
    this.createUserFormGroup.controls.role.setValue({
      id: UserRole.user,
      label: this.translate.instant("user-roles.user"),
    });
  }
}
