import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-skelton',
  imports: [CommonModule, Skeleton, TableModule],
  template: `<div class="card">
    <p-table [value]="products!" responsiveLayout="scroll">
      <ng-template #header>
        <tr>
          <th *ngFor="let title of headerTitles">{{ title }}</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td *ngFor="let product of headerTitles"><p-skeleton /></td>
        </tr>
      </ng-template>
    </p-table>
  </div>`,
  styles: ``,
})
export class TableSkelton implements OnInit {
  products: any[] | undefined;
  @Input() headerTitles: string[] = ['Code', 'Name', 'Category', 'Quantity'];

  ngOnInit() {
    this.products = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
  }
}
