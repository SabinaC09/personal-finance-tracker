import { Component, OnInit } from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { MatCardModule } from '@angular/material/card';
import { LatestTranzactionsCardComponent } from '../latest-tranzactions-card/latest-transactions-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SimpleCardComponent } from '../simple-card/simple-card.component';
import { ExpenseService } from '../expense-list/expense.service';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FinanceCardComponent,
    LatestTranzactionsCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SimpleCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  expenseChartData: any;
  incomeChartDate: any;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    this.expenseService.fetchExpenses();
    this.incomeService.fetchIncomes();

    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenseChartData = expenses;
    });

    this.incomeService.getIncomes().subscribe((incomes) => {
      this.incomeChartDate = incomes;
    });
  }

}
