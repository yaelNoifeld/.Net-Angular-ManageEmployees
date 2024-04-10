import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import * as XLSX from 'xlsx';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { HighlightDirective } from '../../pipes/highlight.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [CommonModule, HttpClientModule, EmployeeDetailsComponent, ReactiveFormsModule,
    NgbModalModule, FormsModule, FilterPipe, HighlightDirective],
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
  providers: [EmployeeService]
})

export class AllEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employee!: Employee;
  searchText = '';
  employeesString = JSON.stringify(this.employees);


  constructor(private employeeService: EmployeeService, public modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.employeeService.employees$.subscribe(
      employeesServer => {
        this.employees = employeesServer;
      },
      error => console.log(error)
    );
  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'employees');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  addEmployee() {
    if (!sessionStorage['token'] || sessionStorage['token'] === '') {
      this.router.navigate(['/login']);
    }
    else{
      const modalRef = this.modalService.open(AddEmployeeComponent, {
        backdrop: 'static',
      });
      this.employeeService.refreshEmployee();
    }
  }
}
