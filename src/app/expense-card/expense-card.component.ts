import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss'
})
export class ExpenseCardComponent {
  selectedPeriod = 'today'

  constructor(private router: Router) { }

  navigateToExpenseList() {
    this.router.navigate(['/expense-list']);
  }

}
