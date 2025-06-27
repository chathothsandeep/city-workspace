import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  template: `<footer
    class="flex flex-col items-end justify-content-center w-full p-6 border-t border-gray-100 dark:border-gray-700"
  >
    <P class="text-[10px] text-gray-500 dark:text-gray-400"
      >CopyRight © 2023 CityMap All Rights Reserved.</P
    >
  </footer>`,
  styles: ``,
})
export class Footer {}
