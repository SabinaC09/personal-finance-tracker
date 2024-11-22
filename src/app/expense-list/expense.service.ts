import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = 'http://localhost:8080/expenses';
  private expenseData = new BehaviorSubject<Expense[]>([]);
  // private incomeData = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {}

  fetchExpenses(): void {
    this.http.get<Expense[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.expenseData.next(data);
        // this.incomeData.next(data.filter((item) => item.type === 'income'));
      },
      error: (error) => console.error('Error fetching expenses:', error),
    });
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenseData.asObservable();
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  }

  // updateExpense(id: number, expense: Expense): Observable<Expense> {
  //   return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  // }

  // deleteExpense(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
