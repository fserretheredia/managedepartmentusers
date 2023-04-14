import { ActionReducerMap, createFeatureSelector, StoreModule } from "@ngrx/store";

import * as fromDepartment from "./department/department.reducer";
import * as fromUserDepartment from "./user-department/user-department.reducer";

export const SHARED_STORE_NAME = 'shared-state'

export interface SharedState {
  department: fromDepartment.StateDepartment;
  userDepartment: fromUserDepartment.StateUserDepartment;
}

export const SharedReducer: ActionReducerMap<SharedState> = {
  department: fromDepartment.reducer,
  userDepartment: fromUserDepartment.reducer,
};

export const SHARED_STORE = StoreModule.forFeature(SHARED_STORE_NAME, SharedReducer)

export const getSharedState =
  createFeatureSelector<SharedState>(SHARED_STORE_NAME);
