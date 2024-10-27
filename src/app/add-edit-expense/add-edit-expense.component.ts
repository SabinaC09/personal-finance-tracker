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
import { Router } from '@angular/router';
import { ExpenseService } from '../expense-list/expense.service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  ],
  templateUrl: './add-edit-expense.component.html',
  styleUrl: './add-edit-expense.component.scss',
})
export class AddEditExpenseComponent {
  expenseForm: FormGroup;
  isEditMode = false;
  categories: string[] = [
    'Food',
    'Groceries',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Other',
  ];
  expenseId: number | null = null;
  private _snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private expenseService = inject(ExpenseService);
  categoryControl = new FormControl();
  filteredCategories: Observable<string[]>;
  newCategory: string = '';
  isNewCategoryVisible: boolean = false;

  constructor(private fb: FormBuilder) // private route: ActivatedRoute
  {
    this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value))
    ) .subscribe(filtered => {
      this.filteredCategories = filtered; // Assign the filtered result to the property
    });

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

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    const matchingCategories = this.categories.filter(category => category.toLowerCase().includes(filterValue));

    // Show the "Create" option if the typed category is not in the list
    this.newCategory = value; // Update the newCategory variable
    this.isNewCategoryVisible = matchingCategories.length === 0 && value.length > 0;

    return matchingCategories;
  }

  addNewCategory() {
    // Handle the addition of the new category
    if (this.newCategory) {
      this.categories.push(this.newCategory);
      this.categoryControl.setValue(this.newCategory); // Set the input to the new category
      this.newCategory = ''; // Reset the new category input
      this.isNewCategoryVisible = false; // Hide the create option
    }
  }

  ngOnInit(): void {
    
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
        categoryName: expenseData.category 
      };
      if (this.isEditMode) {
        console.log('Updating expense:', expenseData);
      } else {
        console.log('Adding new expense:', newExpense);
        this.expenseService
          .addExpense(newExpense)
          .subscribe({
            next: (response) => {
              console.log('Expense added:', response);
            },
            error: (error) => {
              console.error('Error adding expense:', error);
            },
          });
        this.openSnackBar('Expense Added Succesfully', 'Close');
        this.location.back();
      }
    }
    

    // if (this.expenseForm.valid) {
    //   const expenseData = this.expenseForm.value;
    //   if (this.isEditMode) {
    //     console.log('Updating expense:', expenseData);
    //   } else {
    //     console.log('Adding new expense:', expenseData);
    //     this.openSnackBar('Expense Added Succesfully', 'Close')
    //     this.location.back()
    //   }
    // }
  }

  onCancel() {
    this.location.back();
  }
}
