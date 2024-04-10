import { Routes } from '@angular/router';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddEmployeeRoleComponent } from './components/add-employee-role/add-employee-role.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    { path: "", redirectTo: "all-employees", pathMatch: "full" },
    { path: "all-emploees", component: AllEmployeesComponent },
    { path: "add-emploee", component: AddEmployeeComponent },
    { path: "add-roles", component: AddEmployeeRoleComponent },
    { path: "login", component: LoginComponent },
    { path: "**", component: AllEmployeesComponent }
];

