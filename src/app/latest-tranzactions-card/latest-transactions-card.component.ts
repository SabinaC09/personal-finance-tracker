import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-latest-transactions-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './latest-transactions-card.component.html',
  styleUrl: './latest-transactions-card.component.scss',
})
export class LatestTranzactionsCardComponent {
  selectedPeriod = 'Today'
}
