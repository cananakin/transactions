import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
      path: '', component: DefaultComponent,
      children: [
          { path: '', component: LoginComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
