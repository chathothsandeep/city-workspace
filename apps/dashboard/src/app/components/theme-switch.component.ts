
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-switch',
  imports: [CommonModule, ButtonModule],
  template: `<p-button
    severity="secondary"
    variant="outlined"
    (click)="toggleTheme()"
    class="icon"
    aria-label="Toggle Theme"
  >
    <span>
      @if (!isDark) {
        <i class="pi pi-moon"></i>
      } @else if (isDark) {
       <i class="pi pi-sun"></i>
      }
    </span>
  </p-button> `,
})
export class ThemeSwitchComponent implements OnInit {
  isDark = false;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    const currentTheme = this.doc.body.classList.contains('dark')
      ? 'dark'
      : 'light';
    this.isDark = currentTheme === 'dark';
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    const element = this.doc.querySelector('html');
    element?.classList.toggle('dark');
  }
}
