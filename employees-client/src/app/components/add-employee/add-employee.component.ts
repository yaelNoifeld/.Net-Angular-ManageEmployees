import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee, Gender } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModalModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  private storedEmployee = localStorage.getItem('currentEmployee');
  employeeEdit?: Employee | null = this.storedEmployee ? JSON.parse(this.storedEmployee) : null;
  formToSend?: any;
  rolesToSend: any = [];
  employeeId!: number;
  @Input() src: any;

  addEmployeeForm: FormGroup = new FormGroup({
    "idCard": new FormControl(this.employeeEdit?.idCard, [Validators.required, Validators.minLength(9)
      , Validators.maxLength(9)]),
    "firstName": new FormControl(this.employeeEdit?.firstName, Validators.required),
    "lastName": new FormControl(this.employeeEdit?.lastName, Validators.required),
    "startDate": new FormControl(this.employeeEdit?.startDate, Validators.required),
    "dateBirth": new FormControl(this.employeeEdit?.dateBirth, Validators.required),
    "gender": new FormControl(this.employeeEdit?.gender, Validators.required),
    "roles": new FormControl(this.employeeEdit?.roles,),
  })

  constructor(private employeeService: EmployeeService, public activeModal: NgbActiveModal,
    public modalService: NgbModal, private router: Router) { }

  saveDetails() {
    let rolesLength = 0;
    rolesLength = this.employeeEdit?.roles?.length!;
    for (let index = 0; index < rolesLength; index++) {
      let role = {
        "role": {
          "name": this.employeeEdit?.roles?.at(index)?.role?.name
        },
        "isManageRole": this.employeeEdit?.roles?.at(index)?.isManageRole,
        "dateEntryOffice": this.employeeEdit?.roles?.at(index)?.dateEntryOffice
      }
      this.rolesToSend.push(role);
    }

    this.formToSend = {
      "firstName": this.addEmployeeForm.value.firstName,
      "lastName": this.addEmployeeForm.value.lastName,
      "idCard": this.addEmployeeForm.value.idCard,
      "startDate": this.addEmployeeForm.value.startDate,
      "dateBirth": this.addEmployeeForm.value.dateBirth,
      "gender": parseInt(this.addEmployeeForm.value.gender),
      "roles": this.rolesToSend
    }
    console.log(this.formToSend);
    if (this.employeeId !== 0) {
      localStorage.setItem('rolesEmployee', JSON.stringify(this.employeeEdit));
      this.employeeService.updateEmployee(this.employeeId, this.formToSend).subscribe(
        employeesServer => {
          console.log(`employee ${employeesServer.id} was changed successfully`)
        },
        error => console.log(error)
      )
    }
    else {
      localStorage.setItem('rolesEmployee', JSON.stringify(this.formToSend));
      this.employeeService.addEmployee(this.formToSend).subscribe(
        employeesServer => {
          console.log(`${employeesServer} was added successfully`)
        },
        error => console.log(error)
      )
    }
    this.closeForm();
    this.router.navigate(['all-employees']);
  }

  closeForm() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    localStorage.setItem('currentEmployee', '');
    if (this.employeeEdit !== null)
      this.employeeId = this.employeeEdit!.id;
    else
      this.employeeId = 0;
    console.log(this.employeeEdit?.roles);
  }

  addRoles(){
    this.saveDetails();
    this.router.navigate(['add-roles']);
  }

}