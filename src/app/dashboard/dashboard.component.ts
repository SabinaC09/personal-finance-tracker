import { Component } from '@angular/core';
import { BudgetComponent } from '../budget/budget.component';
import { IncomeListComponent } from '../income-list/income-list.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { IncomeCardComponent } from '../income-card/income-card.component';
import { ExpenseCardComponent } from '../expense-card/expense-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BudgetComponent,IncomeCardComponent, ExpenseCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
