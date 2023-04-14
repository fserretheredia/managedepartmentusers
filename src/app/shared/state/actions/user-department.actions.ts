import { createAction, props } from "@ngrx/store";
import { BodyUser, Department, User } from "../../models";

export const LoadAllUsersDepartment = createAction(
    "[User] Load all users department",
    props<{ department: Department }>()
);

export const LoadAllUsersDepartmentSuccess = createAction(
    "[User] Load all users department success",
    props<{ departmentUsers: User[] }>()
);

export const LoadUserDepartment = createAction(
    "[User] Load user department",
    props<{ userId: number }>()
);

export const LoadUserDepartmentSuccess = createAction(
    "[User] Load user department success",
    props<{ departmentUserSelected: User }>()
);

export const CreateUserDepartment = createAction(
    "[User] Create new user department",
    props<{ user: BodyUser }>()
);

export const CreateUserDepartmentSuccess = createAction(
    "[User] Create new user department success"
);

export const UpdateUserDepartment = createAction(
    "[User] Update department",
    props<{ newDepartmentId: number, user: BodyUser }>()
);

export const UpdateUserDepartmentSuccess = createAction(
    "[User] Update department success"
);

export const DeleteUserDepartment = createAction(
    "[User] Delete user department",
    props<{ userId: number }>()
);

export const DeleteUserDepartmentSuccess = createAction(
    "[User] Delete user department success"
);

export const ResetListUserDepartment = createAction(
    "[User] Reset list user department"
);

export const ResetDepartmentUserSelected = createAction(
    "[User] Reset user department"
);