import { EmployeeRole } from "./employee-role.model";

export enum Gender {
  Male,
  Female
}

export class Employee {
  id!: number;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  startDate?: Date;
  dateBirth?: Date;
  gender?: Gender;
  roles?: EmployeeRole[];
  status?: boolean;
}
