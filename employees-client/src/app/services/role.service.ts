import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  path:string="https://localhost:7189/api/Roles";
  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.path); 
  }
  addRole(position:Role):Observable<Role>{
    return this.http.post<Role>(this.path, position);
  }
  updateRole(id:number, position:Role):Observable<Role>{
    return this.http.put<Role>(`${this.path}/${id}`, position);
  }
  deleteRole(id:number):Observable<void>{
    return this.http.delete<void>(`${this.path}/${id}`);
  }
  constructor(private http:HttpClient){}

}
