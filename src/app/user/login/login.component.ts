import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    // event.preventDefault();
    console.log(form.invalid);
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

    //console.log(email, password);
    //console.log({ emailValue, passwordValue });

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}
