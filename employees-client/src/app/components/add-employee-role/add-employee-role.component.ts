import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { EmployeeRole } from '../../models/employee-role.model';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee-role.component.html',
  styleUrl: './add-employee-role.component.css'
})
export class AddEmployeeRoleComponent {

  roles?: Role[];
  rolesToEmployee: EmployeeRole[] = [];
  employeeString: string = localStorage.getItem('rolesEmployee')!;
  employeeJSON: Employee = JSON.parse(this.employeeString);
  formToSend?: any;
  errMessage?: any;
  successMessage?: any;
  addAnotherMessage?: any;
  employeeName?: string=this.employeeJSON.firstName+" "+this.employeeJSON.lastName;

  constructor(private roleService: RoleService, private employeeService: EmployeeService) { }
  ngOnInit() {
    this.roleService.getRoles().subscribe(
      rolesServer => this.roles = rolesServer,
      err => console.log(err)
    );
  }

  addRoleEmployeeForm: FormGroup = new FormGroup({
    "name": new FormControl(),
    "isManageRole": new FormControl(),
    "dateEntryOffice": new FormControl(),
  })

  saveDetails() {
    console.log(this.employeeJSON);
    console.log(this.employeeJSON.roles);
    for (const role of this.employeeJSON.roles!) {
      this.rolesToEmployee.push(role);
    }
    console.log(this.rolesToEmployee);
    this.formToSend = {
      "firstName": this.employeeJSON.firstName,
      "lastName": this.employeeJSON.lastName,
      "idCard": this.employeeJSON.idCard,
      "startDate": this.employeeJSON.startDate,
      "dateBirth": this.employeeJSON.dateBirth,
      "gender": parseInt(this.employeeJSON.gender?.toString()!),
      "roles": this.rolesToEmployee
    }
    console.log(`The form with roles: ${JSON.stringify(this.formToSend)}`);
    this.employeeService.updateEmployee(this.employeeJSON.id, this.formToSend).subscribe(
      employeeServer => {
        console.log(`add roles to employee: ${JSON.stringify(employeeServer)}
       ${JSON.stringify(employeeServer)}`), this.successMessage = "The roles were added successfuly!"
      },
      err => {
        {
          this.errMessage = JSON.stringify(err.error), console.log(this.errMessage),
          this.rolesToEmployee = [];
        }
      }
    );
    this.errMessage = null;
    this.rolesToEmployee = [];
    this.addRoleEmployeeForm.reset();
  }
  addAnotherRole() {
    let roleToEmployee = {
      "role": {
        "name": this.addRoleEmployeeForm?.value.name,
      },
      "isManageRole": this.addRoleEmployeeForm?.value.isManageRole,
      "dateEntryOffice": this.addRoleEmployeeForm?.value.dateEntryOffice
    };
    this.rolesToEmployee.push(roleToEmployee);
    console.log(`roles to employee: ${JSON.stringify(this.rolesToEmployee)}`);

    this.addAnotherMessage = "Add another roll in the form...";
    setTimeout(() => {
      this.addAnotherMessage = null;
      this.addRoleEmployeeForm.reset();
    }, 2500);
  }
}
