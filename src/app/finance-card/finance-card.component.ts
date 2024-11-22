import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Expense } from '../expense-list/expense.model';
import { Income } from '../dashboard/income.model';

@Component({
  selector: 'app-finance-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    BaseChartDirective,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './finance-card.component.html',
  styleUrl: './finance-card.component.scss',
})
export class FinanceCardComponent implements OnInit, OnChanges {
  selectedPeriod = 'this month';
  @Input() title!: string;
  @Input() data!: Expense[] | Income[];
  navigationRoute: string | undefined;
  chart: any;
  chartData: { data: number[]; label: string }[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
  };
  chartType: ChartType = 'doughnut'; // bar, line, pie, doughnut, radar, polarArea
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.data && this.data.length) {
      this.setupChartData(this.data);
    }
    this.navigationRoute = '/' + this.title.toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setupChartData(this.data);
    }
  }

  navigateToExpenseList() {
    this.router.navigate([this.navigationRoute]);
  }

  private setupChartData(data: Expense[] | Income[]) {
    const categoryTotals: { [key: string]: number } = {};

    if (data.length === 0) {
      this.chartLabels = ['No expenses'];
      this.chartData = [
        {
          data: [100],
          label: `No expenses for ${this.selectedPeriod}`,
        },
      ];
    } else {
      data.forEach((item) => {
        const categoryName =
          this.title === 'Expenses' && 'categoryName' in item
            ? item.categoryName
            : 'source' in item
            ? item.source
            : 'unknown';
        if (categoryTotals[categoryName]) {
          categoryTotals[categoryName] += item.amount;
        } else {
          categoryTotals[categoryName] = item.amount;
        }
      });

      this.chartLabels = Object.keys(categoryTotals);
      this.chartData = [
        {
          data: Object.values(categoryTotals),
          label: 'Data by Category',
        },
      ];
    }
  }

  filterDataByPeriod(period: string): Expense[] | Income[] {
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
        return this.data;
    }

    return this.title === 'Expenses' ? this.data.filter((item) => new Date(item.date) >= startDate) as Expense[] :  this.data.filter((item) => new Date(item.date) >= startDate) as Income[];
  }

  onPeriodChange() {
    this.setupChartData(this.filterDataByPeriod(this.selectedPeriod));
  }
}
