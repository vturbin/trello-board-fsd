import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

enum ErrorTypes {
  Required = 'required',
  MinLength = 'minlength',
  MaxLength = 'maxlength',
  Min = 'min',
  Max = 'max',
  Email = 'email',
}

@Pipe({
  name: 'mapErrorToText',
  standalone: true,
})
export class MapErrorToTextPipe implements PipeTransform {
  transform(error: { key: string; value: any }): string | null {
    if (!error) {
      return null;
    }

    return this.mapErrorToText(error.key, error.value);
  }

  private mapErrorToText(errorKey: string, errorValue: any) {
    switch (errorKey) {
      case ErrorTypes.Required:
        return 'This field is required';
      case ErrorTypes.Email:
        return 'Field must be a valid email';
      case ErrorTypes.MinLength:
        // {minlength: {requiredLength: 3, actualLength: 2}}
        return `Required length is ${errorValue.requiredLength}, but got ${errorValue.actualLength}`;
      case ErrorTypes.MaxLength:
        // {maxlength: {requiredLength: 3, actualLength: 2}}
        return `Max length is ${errorValue.requiredLength}, but got ${errorValue.actualLength}`;
      case ErrorTypes.Min:
        // {min: {min: 3, actual: 2}}
        return `Min value is ${errorValue.min}, but got ${errorValue.actual}`;
      case ErrorTypes.Max:
        // {max: {max: 3, actual: 5}}
        return `Max value is ${errorValue.max}, but got ${errorValue.actual}`;
      default:
        return '';
    }
  }
}
