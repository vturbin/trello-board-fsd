import { inject, Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

enum ErrorTypes {
  Required = "required",
  MinLength = "minlength",
  MaxLength = "maxlength",
  Min = "min",
  Max = "max",
  Email = "email",
}

@Pipe({
  name: "mapErrorToText",
  standalone: true,
})
export class MapErrorToTextPipe implements PipeTransform {
  private translateService = inject(TranslateService); // Injecting TranslateService

  transform(error: { key: string; value: any }): string | null {
    if (!error) {
      return null;
    }

    return this.mapErrorToText(error.key, error.value);
  }

  private mapErrorToText(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case ErrorTypes.Required:
        return this.translateService.instant("validation-errors.required");
      case ErrorTypes.Email:
        return this.translateService.instant("validation-errors.email");
      case ErrorTypes.MinLength:
        return this.translateService.instant("validation-errors.minlength", {
          requiredLength: errorValue.requiredLength,
          actualLength: errorValue.actualLength,
        });
      case ErrorTypes.MaxLength:
        return this.translateService.instant("validation-errors.maxlength", {
          requiredLength: errorValue.requiredLength,
          actualLength: errorValue.actualLength,
        });
      case ErrorTypes.Min:
        return this.translateService.instant("validation-errors.min", {
          min: errorValue.min,
          actual: errorValue.actual,
        });
      case ErrorTypes.Max:
        return this.translateService.instant("validation-errors.max", {
          max: errorValue.max,
          actual: errorValue.actual,
        });
      default:
        return "";
    }
  }
}
