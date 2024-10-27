import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Expense } from "./expense.model";

@Injectable({
    providedIn: 'root'
  })
  export class ExpenseService {
    private baseUrl = 'http://localhost:8080/api/expenses';
  
    constructor(private http: HttpClient) {}
  
    getExpenses(): Observable<Expense[]> {
      return this.http.get<Expense[]>(this.baseUrl);
    }
  
    addExpense(expense: Expense): Observable<Expense> {
      return this.http.post<Expense>(this.baseUrl, expense);
    }
  
    // updateExpense(id: number, expense: Expense): Observable<Expense> {
    //   return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
    // }
  
    // deleteExpense(id: number): Observable<void> {
    //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
    // }
  }