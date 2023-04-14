import { DepartmentStoreFacade } from "./department/department.facade";
import { UserDepartmentStoreFacade } from "./user-department/user-department.facade";

export const SHARED_STORE_FACADES = [
    DepartmentStoreFacade,
    UserDepartmentStoreFacade
];

export * from "./department/department.facade";
export * from "./user-department/user-department.facade";