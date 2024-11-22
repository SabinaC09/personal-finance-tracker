import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Income } from './income.model';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private baseUrl = 'http://localhost:8080/incomes';
  private incomeData = new BehaviorSubject<Income[]>([]);

  constructor(private http: HttpClient) {}

  fetchIncomes(): void {
    this.http.get<Income[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.incomeData.next(data);
      },
      error: (error) => console.error('Error fetching expenses:', error),
    });
  }

  getIncomes(): Observable<Income[]> {
    return this.incomeData.asObservable();
  }

}
