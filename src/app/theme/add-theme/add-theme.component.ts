import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addTheme(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      return;
    }
    // console.log(form.value);
    const { themeName, postText } = form.value;

    this.apiService.createTheme(themeName, postText).subscribe(() => {
      // console.log(data);
      this.router.navigate(['/themes']);
    });
  }
}
