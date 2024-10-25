import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-simple-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {
  title = input('')
  content = input('')
  learnMore = input(false)
  private router = inject(Router)

  navigateTo(title: string) {
    console.log(title)
    this.router.navigate(['/' + title]);
  }
}
