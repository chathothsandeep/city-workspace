import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-minimal.layout',
  imports: [CommonModule, RouterModule],
  template: `<div class="mx-auto container">
    <router-outlet></router-outlet>
  </div>`,
  styles: ``,
})
export class MinimalLayout {}
