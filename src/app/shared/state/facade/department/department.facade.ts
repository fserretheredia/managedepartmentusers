import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BodyDepartment, Department } from 'src/app/shared/models';
import * as departmentActions from '../../actions/department.actions';
import * as departmentSelector from '../../selectors/department/department.selector';

@Injectable({
  providedIn: 'root'
})
export class DepartmentStoreFacade {
  constructor(private store: Store) {}

  getAllDepartments$: Observable<Department[]> = this.store.pipe(
    select(departmentSelector.getAllDepartments)
  );

  getDepartmentSelected$: Observable<Department> = this.store.pipe(
    select(departmentSelector.getDepartmentSelected)
  );

  loadAllDepartments(): void {
    this.store.dispatch(departmentActions.LoadAllDepartments());
  }

  loadDepartmentsById(departmentId: number): void {
    this.store.dispatch(
      departmentActions.LoadDepartmentsById({ departmentId })
    );
  }

  createDepartment(department: BodyDepartment): void {
    this.store.dispatch(departmentActions.CreateDepartment({ department }));
  }

  updateDepartment(department: BodyDepartment): void {
    this.store.dispatch(
      departmentActions.UpdateDepartment({ department })
    );
  }

  deleteDepartment(departmentId: number): void {
    this.store.dispatch(departmentActions.DeleteDepartment({ departmentId }));
  }

  resetDepartmentSelected(): void {
    this.store.dispatch(departmentActions.ResetDepartmentSelected());
  }
}
