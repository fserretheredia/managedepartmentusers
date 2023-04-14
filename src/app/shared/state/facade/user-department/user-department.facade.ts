import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BodyUser, Department, User } from 'src/app/shared/models';
import * as userDepartmentActions from '../../actions/user-department.actions';
import * as userDepartmentSelector from '../../selectors/user-department/user-department.selector';

@Injectable({
  providedIn: 'root'
})
export class UserDepartmentStoreFacade {
  constructor(private store: Store) {}

  getAllUsersDepartment$: Observable<User[]> = this.store.pipe(
    select(userDepartmentSelector.getAllUsersDepartment)
  );

  getUserDepartmentSelected$: Observable<User> = this.store.pipe(
    select(userDepartmentSelector.getUserDepartmentSelected)
  );

  loadAllUsersDepartment(department: Department): void {
    this.store.dispatch(
      userDepartmentActions.LoadAllUsersDepartment({ department })
    );
  }

  loadUserDepartment(userId: number): void {
    this.store.dispatch(
      userDepartmentActions.LoadUserDepartment({ userId })
    );
  }

  createUserDepartment(user: BodyUser): void {
    this.store.dispatch(
      userDepartmentActions.CreateUserDepartment({ user })
    );
  }

  updateUserDepartment(newDepartmentId: number, user: BodyUser): void {
    this.store.dispatch(
      userDepartmentActions.UpdateUserDepartment({ newDepartmentId, user })
    );
  }

  deleteUserDepartment(userId: number): void {
    this.store.dispatch(
      userDepartmentActions.DeleteUserDepartment({ userId })
    );
  }

  resetListUserDepartment(): void {
    this.store.dispatch(userDepartmentActions.ResetListUserDepartment());
  }

  resetDepartmentUserSelected(): void {
    this.store.dispatch(userDepartmentActions.ResetDepartmentUserSelected());
  }
}
