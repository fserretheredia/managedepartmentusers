import { DepartmentsService } from "./departments/departments.service";
import { UserDepartmentService } from "./user-department/user-department.service";

export const SHARED_SERVICE = [
    DepartmentsService,
    UserDepartmentService
];

export * from "./departments/departments.service";
export * from "./user-department/user-department.service";
