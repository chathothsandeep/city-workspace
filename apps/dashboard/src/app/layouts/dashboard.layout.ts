import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard.layout',
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <div class="mx-auto container">
      <app-header></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: ``,
})
export class DashboardLayout {}
