import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./carousel/carousel.component').then(m => m.CarouselComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
