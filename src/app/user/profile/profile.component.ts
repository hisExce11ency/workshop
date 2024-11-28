import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetailes } from '../../types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetailes: ProfileDetailes = {
    username: '',
    email: '',
    tel: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!;
    this.profileDetailes = { username, email, tel: tel! };

    this.form.setValue({
      username,
      email,
      tel: tel!,
    });
  }

  toggleEditMode() {
    //console.log(this.isEditMode);

    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    // console.log(this.form.invalid);
    // console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.profileDetailes = this.form.value as ProfileDetailes;

    const { username, email, tel } = this.profileDetailes;
    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.toggleEditMode();
    });

    //this.userService.updateProfile();
  }
  onCancel(event: Event) {
    event.preventDefault();
    // console.log('on Cancel INVOKED');
    this.toggleEditMode();
  }
}
