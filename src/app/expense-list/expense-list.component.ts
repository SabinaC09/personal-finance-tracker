import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { Expense } from './expense.model';
import { DUMMY_EXPENSES } from './expense-data';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    MatExpansionModule,
    MatAccordion,
    MatDatepickerModule,
    OverlayModule,
    MatCheckboxModule
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = DUMMY_EXPENSES
  myControl = new FormControl('');
  options: string[] = this.expenses.map((expense) => expense.description);
  filteredOptions: Observable<string[]> | undefined;

  constructor(private router: Router) { }

  // needs more work
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value != null && value.length > 0) return this._filter(value || '');
        else return [];
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  navigateToAddEditExpense() {
    this.router.navigate(['/add-expense']);
  }

  categories = this.expenses.map(expense => ({ name: expense.description, checked: false }));

  minPrice: number | undefined;
  maxPrice: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;

  panelOpenState = false;
  filteredExpenses = this.expenses;

  update() {
    
  }

  applyFilters() {
    // Filter by category
    const selectedCategories = this.categories.filter(category => category.checked).map(category => category.name);

    this.filteredExpenses = this.expenses.filter(expense => {
      // const matchesCategory = selectedCategories.length ? selectedCategories.includes(expensesel.category) : true;
      // const matchesPrice = (!this.minPrice || expense.amount >= this.minPrice) && (!this.maxPrice || expense.amount <= this.maxPrice);
      // const matchesDate = (!this.startDate || new Date(expense.date) >= this.startDate) && (!this.endDate || new Date(expense.date) <= this.endDate);
      // return matchesCategory && matchesPrice && matchesDate;
      // return matchesCategory
      console.log(selectedCategories)
        
    });
    console.log(this.filteredExpenses)
    this.panelOpenState = false;
  }
}

