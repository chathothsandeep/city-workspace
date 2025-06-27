import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { Footer } from '../components/footer';

@Component({
  selector: 'app-dashboard.layout',
  imports: [CommonModule, HeaderComponent, RouterModule, Sidebar, Footer],
  template: `
    <div class="flex h-screen flex-row w-full">
      <app-sidebar></app-sidebar>
      <div class="flex flex-col flex-1">
        <app-header></app-header>
        <main class="p-6 h-full flex flex-col flex-1 overflow-y-auto ">
          <router-outlet></router-outlet>
        </main>
        <app-footer></app-footer>
      </div>
      <div class="hidden"></div>
    </div>
  `,
  styles: ``,
})
export class DashboardLayout {}
