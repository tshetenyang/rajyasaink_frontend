import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/shared_service/auth.guard';





export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'admin', canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { breadcrumb: 'Admin', role: ['1'] }
  },
  {
    path: 'manager', canActivate: [AuthGuard],
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
    data: { breadcrumb: 'Manager', role: ['2'] }
  },
  {
    path: 'employee', canActivate: [AuthGuard],
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    data: { breadcrumb: 'Employee', role: ['3'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],


})
export class AppRoutingModule { }
