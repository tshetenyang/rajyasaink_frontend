import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/shared_service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    data: { breadcrumb: ' Manager Dashboard' },
    children: [
      {
        path: 'samplepage', canActivate: [AuthGuard],
        loadComponent: () => import('./sample-page/sample-page.component').then(m => m.SamplePageComponent),
        data: { breadcrumb: ' samplepage' }
      },

    ]
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
