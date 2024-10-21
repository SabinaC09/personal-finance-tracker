import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-latest-tranzactions-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './latest-tranzactions-card.component.html',
  styleUrl: './latest-tranzactions-card.component.scss'
})
export class LatestTranzactionsCardComponent {

}
