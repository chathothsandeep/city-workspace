import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  template: `<i class="pi pi-spin pi-spinner"></i>`,
  styles: [],
})
export class SpinnerComponent {}
