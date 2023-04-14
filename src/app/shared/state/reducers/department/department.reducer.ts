import { createReducer, on } from "@ngrx/store";
import { Department } from "../../../models";
import * as departmentAction from "../../actions/department.actions";

export interface StateDepartment {
  departments: Department[];
  departmentSelected: Department;
}

export const estadoInicial: StateDepartment = {
  departments: [],
  departmentSelected: null,
};

export const reducer = createReducer(
  estadoInicial,
  on(departmentAction.LoadAllDepartmentsSuccess, (estado, { departments }) => {
    return {
      ...estado,
      departments,
    };
  }),
  on(
    departmentAction.LoadDepartmentsByIdSuccess,
    (estado, { departmentSelected }) => {
      return {
        ...estado,
        departmentSelected,
      };
    }
  ),
  on(
    departmentAction.ResetDepartmentSelected,
    (estado) => {
      return {
        ...estado,
        departmentSelected: null,
      };
    }
  )
);
