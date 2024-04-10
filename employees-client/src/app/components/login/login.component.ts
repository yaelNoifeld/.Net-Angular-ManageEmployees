import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AllEmployeesComponent } from '../all-employees/all-employees.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: "all-employees", component: AllEmployeesComponent }
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [],
      password: []
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginModel = this.loginForm.value;
      this.http.post<any>('https://localhost:7189/api/Auth', loginModel)
        .pipe(
          tap(response => {
            const token = response.token;
            console.log("token", token);
            this.sendTokenToServer(token);
            sessionStorage.setItem('token', token);
          }),
          catchError(error => {
            return throwError(error);
          })
        ).subscribe();
        this.router.navigate(['all-employees'])
    }
  }

  private sendTokenToServer(token: string): void {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    // console.log(`headers: ${JSON.stringify(headers)}`);
    // localStorage.setItem('headers',String(headers));
  }
}
