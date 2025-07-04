import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, Dialog, ButtonModule],
  template: `<div class="card flex justify-center">
    <p-dialog
      header="{{ title }}"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-8">{{ message }}</span>
      <div class="flex justify-end gap-2">
        <p-button
          label="{{ cancelText }}"
          severity="secondary"
          (click)="cancelEvent.emit()"
        />
        <p-button label="{{ okText }}" (click)="okEvent.emit()" />
      </div>
    </p-dialog>
  </div>`,
  styles: ``,
})
export class AppDialog {
  @Input() visible = false;
  @Input() title = '';
  @Input() message = '';
  @Input() okText = '';
  @Input() cancelText = 'Cancel';
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<void>();
}
