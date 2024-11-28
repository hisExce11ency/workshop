import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private userService: UserService, private router: Router) {}

  isFieldRequired(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }
  get isEmailValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  get passGroup() {
    return this.form.get('passGroup');
  }
  // Password field error checks
  get passwordHasRequiredError() {
    const passwordControl = this.passGroup?.get('password');
    return passwordControl?.touched && passwordControl?.errors?.['required'];
  }
  get passwordHasMinLengthError() {
    const passwordControl = this.passGroup?.get('password');
    return passwordControl?.touched && passwordControl?.errors?.['minlength'];
  }

  register() {
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    const {
      username,
      email,
      tel,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    console.log(this.form.value);

    this.userService
      .register(username!, email!, tel!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/themes']);
      });
  }
}
