import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tr[app-employee-details]',
  standalone: true,
  imports: [CommonModule, NgbModalModule,],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EmployeeDetailsComponent {
  @Input()
  employeeToPresent!: Employee;

  constructor(private employeeService: EmployeeService, private router: Router, public modalService: NgbModal) { }

  deleteEmployee() {
    if (!sessionStorage['token'] || sessionStorage['token'] === '') {
      this.router.navigate(['/login']);
    }
    else {
      this.employeeService.deleteEmployee(this.employeeToPresent.id).subscribe(
        () => console.log(`Employee ${this.employeeToPresent.id} was deleted`),
        err => console.log(err)
      );
      this.employeeService.refreshEmployee();
    }
  }

  editEmployee() {
    if (!sessionStorage['token'] || sessionStorage['token'] === '') {
      this.router.navigate(['/login']);
    }
    else {
      localStorage.setItem('currentEmployee', JSON.stringify(this.employeeToPresent));
      const modalRef = this.modalService.open(AddEmployeeComponent, {
        backdrop: 'static'
      });
      this.employeeService.refreshEmployee();
    }
  }
}


