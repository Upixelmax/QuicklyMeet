import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPrestadorComponent } from './register-prestador/register-prestador.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children:[
    {
      path: 'login',
      component: LoginComponent,

    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'registerPrestador',
      component: RegisterPrestadorComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
