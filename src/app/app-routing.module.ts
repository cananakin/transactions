import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './services/auth-guard.guard';
import { DefaultComponent } from './auth/default/default.component';

const authModule = () => import('./auth/auth.module').then(x => x.AuthModule);
const adminModule = () => import('./layouts/default/default.module').then(x => x.DefaultModule);

const routes: Routes = [
  //{ path: '', component: DefaultComponent},
  { path: 'login', loadChildren: authModule },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuardGuard] },
  
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
