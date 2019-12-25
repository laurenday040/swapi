import { AbstractControl } from '@angular/forms';

export function IsNumber(control: AbstractControl) {
  let response: { valid: boolean } | null = null;

  if (isNaN(control.value)) {
    response = { valid: false };
  }
  return response;
}