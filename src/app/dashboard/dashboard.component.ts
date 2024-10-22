import { Component } from '@angular/core';
import { IncomeCardComponent } from '../income-card/income-card.component';
import { ExpenseCardComponent } from '../expense-card/expense-card.component';
import { MatCardModule } from '@angular/material/card';
import { LatestTranzactionsCardComponent } from '../latest-tranzactions-card/latest-transactions-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BudgetCardComponent } from '../budget-card/budget.-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BudgetCardComponent, IncomeCardComponent, ExpenseCardComponent, LatestTranzactionsCardComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
