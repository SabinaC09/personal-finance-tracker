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
import { ExpenseService } from './expense.service';

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
    MatCheckboxModule,
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  searchControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  filterByPanelState = false;
  filteredExpenses = this.expenses;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  categories: any[] = [];

  constructor(private router: Router, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.fetchExpenses();
    this.fetchCategories();

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value && value.length > 0 ? this._filter(value) : []))
    );
  }

  fetchCategories() {
    this.expenseService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => category)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((name) => ({ name, checked: false }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  fetchExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.filteredExpenses = this.expenses;
        this.options = Array.from(
          new Set(this.expenses.map((expense) => expense.description))
        );
        this.categories = this.expenses
          .map((expense) => expense.categoryName)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((name) => ({ name, checked: false }));
      },
      error: (error) => {
        console.error('Error fetching expenses:', error);
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSearch() {
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      this.filteredExpenses = this.expenses.filter((expense) =>
        expense.description.toLowerCase().startsWith(searchTerm)
      );
    }
  }
  resetSearch(): void {
    this.searchControl.setValue('');
    this.filteredExpenses = this.expenses;
  }

  navigateToAddEditExpense(expense?: Expense) {
    expense
      ? this.router.navigateByUrl(`/edit-expense/${expense.id}`, {
        state: { expense },
      })
      : this.router.navigate(['/add-expense']);
  }

  applyFilters() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.name);

    this.filteredExpenses = this.expenses.filter((expense) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(expense.categoryName);

      const priceMatch =
        (this.minPrice == null || expense.amount >= this.minPrice) &&
        (this.maxPrice == null || expense.amount <= this.maxPrice);

      const expenseDate = new Date(expense.date);
      const dateMatch =
        (!this.startDate || expenseDate >= new Date(this.startDate)) &&
        (!this.endDate || expenseDate <= new Date(this.endDate));

      this.filterByPanelState = false;
      return categoryMatch && priceMatch && dateMatch;
    });
  }

  resetFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.startDate = null;
    this.endDate = null;
    this.categories.forEach((category) => (category.checked = false));
    this.filteredExpenses = this.expenses;
  }
}
