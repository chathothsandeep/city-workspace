import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../lib/services/alert.service';

@Component({
  imports: [RouterModule, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``,
  providers: [MessageService, CookieService, AlertService],
})
export class AppComponent {
  title = 'Dashboard';
}
