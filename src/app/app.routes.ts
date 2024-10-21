import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

export const routes: Routes = [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'expense-list', component: ExpenseListComponent },
{ path: 'income-list', component: ExpenseListComponent },

];

