import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/shared_service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';





const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    data: { breadcrumb: ' Employee Dashboard' },
    children: [
      {
        path: 'registerSainiks', canActivate: [AuthGuard],
        loadComponent: () => import('./sainik-form/sainik-form.component').then(m => m.SainikFormComponent),
        data: { breadcrumb: ' registerSainiks' }
      },

    ]
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
