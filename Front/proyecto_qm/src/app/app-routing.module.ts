import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './modules/auth/service/auth.guard';

export const routes:Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import("./modules/inicio/inicio.module").then(m => m.InicioModule),
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule),
  },
  {
    path: 'horario',
    // canActivate: [AuthGuard],
    loadChildren: () => import("./modules/horario/horario.module").then(m => m.HorarioModule),
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }