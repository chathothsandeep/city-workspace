import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../lib/services/alert.service';

@Component({
  imports: [RouterModule, HeaderComponent, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, CookieService, AlertService],
})
export class AppComponent {
  title = 'Dashboard';
}
