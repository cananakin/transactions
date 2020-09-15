import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { TransactionsComponent } from 'src/app/modules/transactions/transactions.component';
import { ReportsComponent } from 'src/app/modules/reports/reports.component';
import { ClientsComponent } from 'src/app/modules/clients/clients.component';

import { ElementsModule } from 'src/app/elements/elements.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutingModule } from '../admin-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionComponent } from 'src/app/modules/detail/transaction/transaction.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TransactionsComponent,
    ReportsComponent,
    ClientsComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ElementsModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    FlexLayoutModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class DefaultModule { }
