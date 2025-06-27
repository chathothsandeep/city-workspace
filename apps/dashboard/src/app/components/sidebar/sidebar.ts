import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WebUrl } from '../../../lib/constants/url.constants';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './sidebar.html',
  styles: ``,
})
export class Sidebar {
  webUrl = WebUrl;
}
