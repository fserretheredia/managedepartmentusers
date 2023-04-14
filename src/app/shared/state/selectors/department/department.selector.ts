import { createSelector } from "@ngrx/store";
import * as fromFeature from "../../reducers";

const getDepartmentState = createSelector(
  fromFeature.getSharedState,
  (state: fromFeature.SharedState) => state.department
);

export const getAllDepartments = createSelector(
  getDepartmentState,
  (state) => state.departments
);

export const getDepartmentSelected = createSelector(
  getDepartmentState,
  (state) => state.departmentSelected
);