import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
// import Chart from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { DUMMY_EXPENSES } from '../expense-list/expense-data';
import { Expense } from '../expense-list/expense.model';
import { ChartData, ChartType } from 'chart.js';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    BaseChartDirective,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class ExpenseCardComponent {
  selectedPeriod = 'this month';
  expenses: Expense[] = DUMMY_EXPENSES;
  chart: any;
  constructor(private router: Router) {}

  navigateToExpenseList() {
    this.router.navigate(['/expense-list']);
  }

  chartData: { data: number[]; label: string }[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
  };
  chartType: ChartType = 'doughnut'; // bar, line, pie, doughnut, radar, polarArea

  ngOnInit(): void {
    this.setupChartData(this.expenses);
  }

  private setupChartData(expenses: Expense[]) {
    const categoryTotals: { [key: string]: number } = {};

    if (expenses.length === 0) {
      this.chartLabels = ['No expenses'];
      this.chartData = [
        {
          data: [100], 
          label: `No expenses for ${this.selectedPeriod}`,
        },
      ];
    } else {
      expenses.forEach((expense) => {
        if (categoryTotals[expense.categoryName]) {
          categoryTotals[expense.categoryName] += expense.amount;
        } else {
          categoryTotals[expense.categoryName] = expense.amount;
        }
      });

      this.chartLabels = Object.keys(categoryTotals);
      this.chartData = [
        {
          data: Object.values(categoryTotals),
          label: 'Expenses by Category',
        },
      ];
    }
  }

  filterExpensesByPeriod(period: string): Expense[] {
    const now = new Date();
    let startDate;
    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'this week':
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        break;
      case 'this month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        return this.expenses;
    }

    return this.expenses.filter((exp) => new Date(exp.date) >= startDate);
  }

  onPeriodChange() {
    console.log(this.selectedPeriod);
    this.setupChartData(this.filterExpensesByPeriod(this.selectedPeriod));
  }
}
