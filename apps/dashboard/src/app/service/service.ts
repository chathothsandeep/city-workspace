import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { WebUrl } from '../../lib/constants/url.constants';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { TableSkelton } from '../components/table-skeleton';
import { AppDialog } from '../components/dialog';
import { AlertService } from '../../lib/services/alert.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import {
  ActivateEvent,
  ColumnMode,
  NgxDatatableModule,
  SelectEvent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceEntity } from '@city-workspace/shared-models';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    NgOptimizedImage,
    Select,
    FormsModule,
    TableSkelton,
    AppDialog,
    NgxDatatableModule,
    PaginatorModule,
    InputTextModule,
  ],
  templateUrl: './service.html',
  styles: ``,
})
export class ServiceComponent implements OnInit {
  services = signal<ServiceEntity[]>([]);
  loading = false;
  private service = inject(ServiceService);
  private router = inject(Router);
  webUrl = WebUrl;
  options = ['See Details', 'Delete'];
  selectedOptions: { [key: number]: string } = {};
  isDeleteDialogVisible = signal(false);
  isMultipleDeleteDialogVisible = signal(false);
  isDeleteLoading = signal(false);
  private alertService = inject(AlertService);
  object = Object;
  serviceToDelete: ServiceEntity | null = null;
  ColumnMode = ColumnMode;
  reorderable = true;
  selectedServices: ServiceEntity[] = [];
  SelectionType = SelectionType;
  first = 0;
  rows = 10;
  count = 0;
  currentPage = 1;
  searchQuery = '';

  ngOnInit(): void {
    this.getServices();
  }

  onSelect({ selected }: SelectEvent<ServiceEntity>) {
    this.selectedServices.splice(0, this.selectedServices.length);
    this.selectedServices.push(...selected);
  }

  onActivate(event: ActivateEvent<ServiceEntity>) {
    console.log('Activate Event', event);
  }

  getServices() {
    this.loading = true;
    this.service.getServices(this.currentPage, this.searchQuery).subscribe({
      next: (paginatedData) => {
        this.services.set(paginatedData.data);
        this.count = paginatedData.count;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  async gotoCreateService() {
    await this.router.navigate([WebUrl.createService]);
  }

  async onSelectChange(event: any, service: ServiceEntity) {
    this.serviceToDelete = service;
    this.selectedOptions[service.id] = event.value;
    if (this.selectedOptions[service.id] === 'See Details') {
      await this.router.navigate([`${WebUrl.editService}/${service.id}`]);
    } else {
      this.showDeleteDialog();
    }
  }

  showDeleteDialog() {
    this.isDeleteDialogVisible?.set(true);
  }

  showMultipleDeleteDialog() {
    this.isMultipleDeleteDialogVisible?.set(true);
  }

  hideDeleteDialog() {
    this.selectedOptions = {};
    this.isDeleteDialogVisible?.set(false);
    this.isDeleteLoading.set(false);
  }

  hideMultipleDeleteDialog() {
    this.selectedOptions = {};
    this.isMultipleDeleteDialogVisible?.set(false);
    this.isDeleteLoading.set(false);
  }

  onDelete() {
    this.isDeleteLoading.set(true);
    this.service.deleteService(this.serviceToDelete!.id!).subscribe({
      next: () => {
        this.getServices();
        this.hideDeleteDialog();
        this.alertService.showSuccess('Services deleted successfully');
      },
      error: (error) => {
        const errorMessage = error.error.message?.message || error;
        this.hideDeleteDialog();
        this.alertService.showError(JSON.stringify(errorMessage));
      },
    });
  }

  onDeleteMultiple() {
    if (this.selectedServices.length === 0) {
      this.alertService.showError('No servies selected for deletion.');
      return;
    }

    this.isDeleteLoading.set(true);
    this.selectedServices.forEach((service) => {
      this.service.deleteService(service.id).subscribe({
        next: async (data) => {
          await this.getServices();
          this.hideMultipleDeleteDialog();
          this.alertService.showSuccess('Services deleted successfully');
        },
        error: (error) => {
          this.hideMultipleDeleteDialog();
          const errorMessage = error.error.message?.message || error;
          this.alertService.showError(JSON.stringify(errorMessage));
        },
      });
    });
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = Math.floor(event.first! / event.rows!) + 1;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.getServices();
  }

  resetSearch() {
    this.searchQuery = '';
    this.getServices();
  }
}
