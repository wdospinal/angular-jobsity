import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenProfileValidator(profiles: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const found = profiles.find(element => element === control.value);
    return found ? null : { 'forbiddenProfile': { value: control.value } };
  };
}

@Directive({
  selector: '[appForbiddenProfile]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenProfile') forbiddenProfile: string[];

  validate(control: AbstractControl): { [key: string]: any } {
    return this.forbiddenProfile ? forbiddenProfileValidator(this.forbiddenProfile)(control) : null;
  }
}

