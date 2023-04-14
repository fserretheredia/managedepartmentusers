import { createSelector } from "@ngrx/store";
import * as fromFeature from "../../reducers";

const getUserDepartmentState = createSelector(
  fromFeature.getSharedState,
  (state: fromFeature.SharedState) => state.userDepartment
);

export const getAllUsersDepartment = createSelector(
  getUserDepartmentState,
  (state) => state.departmentUsers
);

export const getUserDepartmentSelected = createSelector(
  getUserDepartmentState,
  (state) => state.departmentUserSelected
);