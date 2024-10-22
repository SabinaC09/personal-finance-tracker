import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';

export const routes: Routes = [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'expense-list', component: ExpenseListComponent },
{ path: 'add-expense', component: AddEditExpenseComponent },
{ path: 'edit-expense/:id', component: AddEditExpenseComponent },
{ path: 'income-list', component: ExpenseListComponent },
{ path: 'budget-details', component: BudgetDetailsComponent },
];

