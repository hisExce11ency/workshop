import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passworFormControl = control.get(passwordControlName);
    const rePasswordFormControl = control.get(rePasswordControlName);

    const passwordsAreMatchin =
      passworFormControl?.value === rePasswordFormControl?.value;

    return passwordsAreMatchin ? null : { matchPasswordsValidator: true };
  };
}
