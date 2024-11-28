import { Component } from '@angular/core';
import { TheamsListComponent } from '../theme/theams-list/theams-list.component';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { UserService } from '../user/user.service';
import { HomeComponent } from '../home/home.component';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TheamsListComponent, PostsListComponent, HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  constructor(private userService: UserService) {
  }
}
