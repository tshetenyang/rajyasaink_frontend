import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/shared_service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';





const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { breadcrumb: 'Admin Dashboard' },
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        data: { breadcrumb: '' }
      },
      {
        path: 'createuser',
        canActivate: [AuthGuard],
        loadComponent: () => import('./create-user/create-user.component').then(m => m.CreateUserComponent),
        data: { breadcrumb: 'Create User' }
      },

      // 👇 Masters Management routes
      {
        path: 'masters/district',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/district/district.component').then(m => m.DistrictComponent),
        data: { breadcrumb: 'District' }
      },
      {
        path: 'masters/corps',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/corps/corps.component').then(m => m.CorpsComponent),
        data: { breadcrumb: 'Corps' }
      },
      {
        path: 'masters/commission-type',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/commission-type/commission-type.component').then(m => m.CommissionTypeComponent),
        data: { breadcrumb: 'Commission Type' }
      },
      
      {
        path: 'masters/esm-issue-place',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/esm-issue-place/esm-issue-place.component').then(m => m.EsmIssuePlaceComponent),
        data: { breadcrumb: 'ESM Issue Place' }
      },
      {
        path: 'masters/award-type',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/award-type/award-type.component').then(m => m.AwardTypeComponent),
        data: { breadcrumb: 'Award Type' }
      }, {
        path: 'masters/qualifications',
        canActivate: [AuthGuard],
        loadComponent: () => import('./masters/qualifications/qualifications.component').then(m => m.qualificationComponent),
        data: { breadcrumb: 'Award Type' }
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
