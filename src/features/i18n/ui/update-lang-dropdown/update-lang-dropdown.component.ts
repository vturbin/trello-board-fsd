import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { setLanguage } from "@features/i18n/model/actions";
import { selectLanguage } from "@features/i18n/model/selectors";
import { Lang } from "@features/i18n/model/store";
import { Store } from "@ngrx/store";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { DropdownComponent } from "@shared/ui/dropdown";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-update-lang-dropdown",
  standalone: true,
  imports: [CommonModule, DropdownComponent, FormsModule],
  templateUrl: "./update-lang-dropdown.component.html",
  styleUrl: "./update-lang-dropdown.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateLangDropdownComponent implements OnDestroy {
  public languages = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
  ];

  public currentSelection = { code: "en", label: "English" };

  private subscription = new Subscription();

  public constructor(private store: Store) {
    this.subscription.add(
      this.store.select(selectLanguage).subscribe(lang => {
        this.setCurrentLanguage(lang);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateLanguage(option: { code: string; label: string }): void {
    this.store.dispatch(setLanguage({ lang: option.code as Lang }));
  }

  private setCurrentLanguage(lang: Lang): void {
    console.log(lang);
    for (const languageOption of this.languages) {
      if (languageOption.code === lang) {
        this.currentSelection = languageOption;
        return;
      }
    }
  }
}
