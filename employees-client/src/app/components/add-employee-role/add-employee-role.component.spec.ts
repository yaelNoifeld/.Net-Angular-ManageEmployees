import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeRoleComponent } from './add-employee-role.component';

describe('AddEmployeeRoleComponent', () => {
  let component: AddEmployeeRoleComponent;
  let fixture: ComponentFixture<AddEmployeeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
