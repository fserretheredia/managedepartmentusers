import { createAction, props } from "@ngrx/store";
import { BodyDepartment, Department } from "../../models";

export const LoadAllDepartments = createAction(
    "[Department] Load all departments"
);

export const LoadAllDepartmentsSuccess = createAction(
    "[Department] Load all departments success",
    props<{ departments: Department[] }>()
);

export const LoadDepartmentsById = createAction(
    "[Department] Load department by id",
    props<{ departmentId: number }>()
);

export const LoadDepartmentsByIdSuccess = createAction(
    "[Department] Load department by id success",
    props<{ departmentSelected: Department }>()
);

export const CreateDepartment = createAction(
    "[Department] Create new department",
    props<{ department: BodyDepartment }>()
);

export const CreateDepartmentSuccess = createAction(
    "[Department] Create new department success"
);

export const UpdateDepartment = createAction(
    "[Department] Update department",
    props<{ department: BodyDepartment | BodyDepartment[] }>()
);

export const UpdateDepartmentSuccess = createAction(
    "[Department] Update department success"
);

export const DeleteDepartment = createAction(
    "[Department] Delete department",
    props<{ departmentId: number }>()
);

export const DeleteDepartmentSuccess = createAction(
    "[Department] Delete department success"
);

export const ResetDepartmentSelected = createAction(
    "[Department] Reset department selected"
);