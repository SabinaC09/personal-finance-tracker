import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../expense-list/expense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense-list/expense.service';
import { map, Observable, pluck, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-edit-expense',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-expense.component.html',
  styleUrl: './add-edit-expense.component.scss',
})
export class AddEditExpenseComponent {
  expenseForm: FormGroup;
  isEditMode = false;
  categories: string[] = [
    'Food',
    'Transportation',
    'Utilities',
    'Entertainment',
  ];
  expenseId: number | null = null;
  private _snackBar = inject(MatSnackBar);
  private location = inject(Location);
  newCategory: string = '';
  options: string[] = Array.from(new Set(this.categories));
  filteredOptions: Observable<string[]> | undefined;
  filteredCategories = this.categories;
  showIcon: boolean = true;
  expense: Expense | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService
  ) {
    this.expenseForm = this.fb.group({
      description: new FormControl('', {
        validators: [Validators.required],
      }),
      amount: new FormControl(0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      date: new FormControl('', {
        validators: [Validators.required],
      }),
      category: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  private _filter(value: string): string[] {
    value.length > 2 ? (this.showIcon = false) : (this.showIcon = true);
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  resetCategory(): void {
    this.expenseForm.get('category')!.setValue('');
    this.filteredCategories = this.categories;
  }

  ngOnInit() {
    this.expense = history.state.expense;
    if (this.expense) {
      this.isEditMode = true;
      this.expenseForm.patchValue({
        description: this.expense.description,
        amount: this.expense.amount,
        date: this.expense.date,
        category: this.expense.categoryName,
      });
    }

    this.expenseService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.options = Array.from(new Set(this.categories));
        console.log(this.options);
        this.filteredOptions = this.expenseForm
          .get('category')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });

    // this.filteredOptions = this.expenseForm.get('category')!.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );

    // Check if we are editing an existing expense
    // this.route.paramMap.subscribe(params => {
    //   this.expenseId = params.get('id');
    //   if (this.expenseId) {
    //     this.isEditMode = true;
    //     this.loadExpenseData(this.expenseId);  // Load existing expense details
    //   }
    // });
  }

  // Load existing expense data (this is just a placeholder function)
  // loadExpenseData(expenseId: string) {
  //   // Fetch the expense data from a service or backend using the ID
  //   const existingExpense = {
  //     name: 'Grocery Shopping',
  //     amount: 150,
  //     date: new Date(),
  //     category: 'Food',
  //   };
  //   this.expenseForm.patchValue(existingExpense);  // Populate the form with existing data
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;
      const newExpense: Expense = {
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
        categoryName: expenseData.category,
      };
      if (this.isEditMode && newExpense.id) {
        this.expenseService.updateExpense(newExpense.id, newExpense).subscribe({
          next: (response) => {
            console.log('Expense updated:', response);
            this.openSnackBar('Expense Updated Succesfully', 'Close');
            this.router.navigate(['/expenses-list']);
          },
          error: (error) => console.error('Error updating expense:', error),
        });
      } else {
        this.expenseService.addExpense(newExpense).subscribe({
          next: (response) => {
            console.log('Expense added:', response);
          },
          error: (error) => {
            console.error('Error adding expense:', error);
          },
        });
        this.openSnackBar('Expense Added Succesfully', 'Close');
        this.router.navigate(['/expense-list']);
      }
    }
  }

  onCancel() {
    this.location.back();
  }
}
