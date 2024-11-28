import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-theams-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe],
  templateUrl: './theams-list.component.html',
  styleUrl: './theams-list.component.css',
})
export class TheamsListComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}