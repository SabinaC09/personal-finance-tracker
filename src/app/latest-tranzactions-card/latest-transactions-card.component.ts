import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-latest-transactions-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './latest-transactions-card.component.html',
  styleUrl: './latest-transactions-card.component.scss'
})
export class LatestTranzactionsCardComponent {

}
