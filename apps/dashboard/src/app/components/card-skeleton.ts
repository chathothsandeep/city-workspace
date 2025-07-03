import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-card-skeleton',
  imports: [CommonModule, Skeleton],
  template: `<div class="card">
    <div class="p-6">
      <div class="flex mb-4">
        <p-skeleton shape="circle" size="4rem" class="mr-2" />
        <div>
          <p-skeleton width="10rem" class="mb-2" />
          <p-skeleton width="5rem" class="mb-2" />
          <p-skeleton height=".5rem" />
        </div>
      </div>
      <p-skeleton width="100%" height="150px" />
      <div class="flex justify-between mt-4">
        <p-skeleton width="4rem" height="2rem" />
        <p-skeleton width="4rem" height="2rem" />
      </div>
    </div>
  </div>`,
  styles: ``,
})
export class CardSkeleton {}
