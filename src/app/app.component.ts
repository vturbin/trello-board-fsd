import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { PageSpinnerComponent } from "../shared/ui/page-spinner/page-spinner.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastModule } from "primeng/toast";
import { Store } from "@ngrx/store";
import {
  loadSession,
  selectCurrentSession,
  selectIsLoading,
  Session,
} from "@entities/session";
import { filter, Observable, of, take } from "rxjs";
import { PublicHeaderComponent } from "./layouts/public-header/public-header.component";
import { PrivateHeaderComponent } from "./layouts/private-layout/ui/private-header/private-header.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PrivateLoaderService } from "./private-loader.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    AsyncPipe,
    PageSpinnerComponent,
    PublicHeaderComponent,
    PrivateHeaderComponent,
    ToastModule,
    ConfirmDialogModule,
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
    private privateLoader: PrivateLoaderService,
  ) {
    this.store.dispatch(loadSession());
    this.pageLoading$ = this.store.select(selectIsLoading);
    this.session$ = this.store.select(selectCurrentSession);
    this.session$
      .pipe(
        filter(session => session !== undefined),
        take(1),
      )
      .subscribe(() => this.privateLoader.loadAll());
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
}
