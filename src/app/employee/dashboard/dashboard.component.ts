import { Component } from '@angular/core';
import { MaterialModule } from '../../mat-element';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';







@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterOutlet, MaterialModule, BreadcrumbComponent, RouterModule]
})
export class DashboardComponent {
  toggleSidebar: boolean = true;
}
