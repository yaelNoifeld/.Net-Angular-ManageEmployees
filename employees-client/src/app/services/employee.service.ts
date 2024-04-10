import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  employees: Employee[] = [];
  path: string = "https://localhost:7189/api/Employees";
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshEmployee();
  }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(this.path);
  }
  addEmployee(employee: Employee): Observable<Employee> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    employee.id = 0;
    console.log(`add function: ${JSON.stringify(headers)}`);

    return this.http.post<Employee>(this.path, employee, { headers });
  }
  updateEmployee(id: number, employee: Employee): Observable<Employee> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log(`update function: ${JSON.stringify(headers)}`);

    return this.http.put<Employee>(`${this.path}/${id}`, employee, { headers });
  }
  deleteEmployee(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log(`delete function: ${JSON.stringify(headers)}`);

    return this.http.delete<void>(`${this.path}/${id}`, { headers });
  }

  refreshEmployee() {
    this.getEmployees().subscribe(employees => {
      this.employeesSubject.next(employees);
    });
  }
}
