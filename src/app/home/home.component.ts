import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  constructor(private userService: UserService) {}
}
