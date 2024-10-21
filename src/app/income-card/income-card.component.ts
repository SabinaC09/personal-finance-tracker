import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-income-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.scss'
})
export class IncomeCardComponent {
  constructor(private router: Router) { }

  navigateToIncomeList() {
    this.router.navigate(['/income-list']);
  }

}
