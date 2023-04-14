import { createReducer, on } from "@ngrx/store";
import { Department, User } from "../../../models";
import * as departmentUserAction from "../../actions/user-department.actions";

export interface StateUserDepartment {
  departmentUsers: User[];
  departmentUserSelected: User;
}

export const estadoInicial: StateUserDepartment = {
  departmentUsers: [],
  departmentUserSelected: null,
};

export const reducer = createReducer(
  estadoInicial,
  on(departmentUserAction.LoadAllUsersDepartmentSuccess, (estado, { departmentUsers }) => {
    return {
      ...estado,
      departmentUsers,
    };
  }),
  on(
    departmentUserAction.LoadUserDepartmentSuccess,
    (estado, { departmentUserSelected }) => {
      return {
        ...estado,
        departmentUserSelected,
      };
    }
  ),
  on(
    departmentUserAction.ResetListUserDepartment,
    (estado) => {
      return {
        ...estado,
        departmentUsers: []
      };
    }
  ),
  on(
    departmentUserAction.ResetDepartmentUserSelected,
    (estado) => {
      return {
        ...estado,
        departmentUserSelected: null
      };
    }
  )
);
