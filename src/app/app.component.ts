import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TextFieldComponent } from "../shared/ui/text-field/text-field.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../shared/ui/button/button.component";
import { LogoComponent } from "../shared/ui/logo/logo.component";
import { IconComponent } from "../shared/ui/icon/icon.component";
import { SpinnerComponent } from "../shared/ui/spinner/spinner.component";
import { PageSpinnerComponent } from "../shared/ui/page-spinner/page-spinner.component";
import { DropdownComponent } from "../shared/ui/dropdown/dropdown.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../shared/ui/header/header.component";
import { ImageSelectComponent } from "../shared/ui/image-select/image-select.component";
import { ModalComponent } from "../shared/ui/modal/modal.component";
import { ButtonModule } from "primeng/button";
import { MultiselectComponent } from "../shared/ui/multiselect/multiselect.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { PasswordComponent } from "../shared/ui/password/password.component";
import { ToastModule } from "primeng/toast";
import { Store } from "@ngrx/store";
import {
  loadSession,
  selectCurrentSession,
  selectIsLoading,
  Session,
} from "@entities/session";
import { Observable, of, Subscription } from "rxjs";
import { PublicHeaderComponent } from "./layouts/header/public-header/public-header.component";
import { PrivateHeaderComponent } from "./layouts/header/private-header/private-header.component";
import { ROUTER_PATHS } from "@shared/constants";

@Component({
  selector: "app-root",
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
    DropdownComponent,
    CommonModule,
    HeaderComponent,
    ImageSelectComponent,
    ModalComponent,
    ButtonModule,
    MultiselectComponent,
    TranslateModule,
    PasswordComponent,
    PublicHeaderComponent,
    PrivateHeaderComponent,
    ToastModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  protected pageLoading$: Observable<boolean> = of(true);
  protected session$: Observable<Session | undefined>;

  constructor(
    private translateService: TranslateService,
    private store: Store,
  ) {
    this.store.dispatch(loadSession());
    this.pageLoading$ = this.store.select(selectIsLoading);
    this.session$ = this.store.select(selectCurrentSession);
  }

  ngOnInit(): void {
    const languageTag = this.getBrowserLanguage();
    const language = languageTag.split("-")[0]; //"en","de", etc.
    const defaultLanguage = this.getDefaultLanguage(language);
    this.translateService.setDefaultLang(defaultLanguage);
  }

  getBrowserLanguage() {
    return navigator.language;
  }

  getDefaultLanguage(language: string) {
    const availableLanguages = ["en", "de"];
    if (availableLanguages.includes(language)) {
      return language;
    } else {
      return "en";
    }
  }
  // public cities: { name: string; code: string }[] = [
  //   { name: 'New York', code: 'NY' },
  //   { name: 'Rome', code: 'RM' },
  //   { name: 'London', code: 'LDN' },
  //   { name: 'Istanbul', code: 'IST' },
  //   { name: 'Paris', code: 'PRS' },
  // ];

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.pageLoading = false;
  //     console.log(this.pageLoading);
  //   }, 1000);
  //   this.loginFormGroup
  //     .get('selectedCity')
  //     ?.valueChanges.subscribe(value => console.log(value));
  // }
  // title = 'trello-board-fsd';

  // public avatarUrl = getAvatarUrl;

  // public readonly Icons = PrimeIcons;

  // public isModalVisible: boolean = false;

  // public pageLoading = true;

  // public images = Array.from({ length: 8 }, (_, i) => i + 1);

  // public loginFormGroup = new FormGroup({
  //   login: new FormControl(null, {
  //     validators: [Validators.required, Validators.minLength(2)],
  //   }),
  //   password: new FormControl(null, Validators.required),
  //   selectedCity: new FormControl<{ name: string; code: string } | null>(null),
  //   selectedCities: new FormControl<{ name: string; code: string }[] | null>([
  //     { name: 'Istanbul', code: 'IST' },
  //   ]),
  // });

  // public buttonPressed(): void {
  //   console.log('button pressed');
  // }

  // public handleImageChange(image: string | number): void {
  //   console.log(image);
  // }

  // showModal() {
  //   this.isModalVisible = true;
  // }

  // closeModal() {
  //   this.isModalVisible = false;
  // }
}
