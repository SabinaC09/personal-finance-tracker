import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { DUMMY_EXPENSES } from '../expense-list/expense-data';
import { Expense } from '../expense-list/expense.model';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ExpenseCardComponent {
  selectedPeriod = 'today'
  expenses: Expense[] = DUMMY_EXPENSES;

  constructor(private router: Router) { }

  navigateToExpenseList() {
    this.router.navigate(['/expense-list']);
  }

  // title = 'ng-chart';
  // chart: any = [];

  // ngOnInit() {
  //   this.chart = new Chart('chartCanvas', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

}
