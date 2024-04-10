import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: string = "https://localhost:7189/api/Auth";

  constructor(private http: HttpClient) { }
  auth(value: any): Observable<string> {
     var token = this.http.post<string>(this.path, value);
    localStorage.setItem('accessToken', token.toString());
    return token;
  }
}


// const token = localStorage.getItem('accessToken')
// const base64Url = token.split('.')[1]
// //כאשר הערך מכיל תוים בעברית
// const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
// const jsonPayload = decodeURIComponent(
//   atob(base64)
//     .split('')
//     .map(function (c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//     })
//     .join('')
// )
// // עד כאן טיפול בעברית
// const obj = JSON.parse(jsonPayload)
// console.log('obj', obj)
