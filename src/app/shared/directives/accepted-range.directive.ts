import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appAcceptedRange]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AcceptedRangeDirective,
      multi: true,
    },
  ],
})
export class AcceptedRangeDirective implements Validator {
  @Input() appAcceptedRange: number[] = [];

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (
      (control.value as number) > this.appAcceptedRange[1] ||
      (control.value as number) < this.appAcceptedRange[0]
    ) {
      return { appAcceptedRange: true };
    }
    return null;
  }
}
