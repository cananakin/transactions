import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { TransactionsComponent } from '../modules/transactions/transactions.component';
import { ReportsComponent } from '../modules/reports/reports.component';
import { ClientsComponent } from '../modules/clients/clients.component';

import { AuthGuardGuard } from '../services/auth-guard.guard';
import { TransactionComponent } from '../modules/detail/transaction/transaction.component';

const routes: Routes = [
  {
      path: '', component: DefaultComponent,
      children: [{
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'transaction/:id',
        component: TransactionComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'client/:id',
        component: ClientsComponent,
        canActivate: [AuthGuardGuard]
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
