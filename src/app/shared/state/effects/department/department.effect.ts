import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { BodyDepartment, Department } from 'src/app/shared/models';
import { DepartmentsService } from 'src/app/shared/services/departments/departments.service';
import * as departmentAction from '../../actions/department.actions';
import * as departmentSelect from '../../selectors/department/department.selector';

@Injectable()
export class DepartmentEffect {
  constructor(
    private actions$: Actions,
    private departmentService: DepartmentsService,
    private store: Store,
    private router: Router
  ) {}

  loadAllDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(departmentAction.LoadAllDepartments),
      switchMap(() =>
        this.departmentService
          .getAllDepartments()
          .pipe(
            switchMap((departments: Department[]) =>
              from([
                departmentAction.LoadAllDepartmentsSuccess({ departments }),
              ])
            )
          )
      )
    )
  );

  loadDepartmentsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(departmentAction.LoadDepartmentsById),
      switchMap(({ departmentId }: { departmentId: number }) =>
        this.departmentService.getDepartmentById(departmentId).pipe(
          switchMap((departmentSelected: Department) =>
            from([
              departmentAction.LoadDepartmentsByIdSuccess({
                departmentSelected,
              }),
            ])
          )
        )
      )
    )
  );

  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(departmentAction.CreateDepartment),
      switchMap(({ department }: { department: BodyDepartment }) =>
        this.departmentService
          .createDepartment(department)
          .pipe(
            switchMap(() => from([
              departmentAction.CreateDepartmentSuccess(),
              departmentAction.LoadAllDepartments()
            ]))
          )
      ),
      tap(() => this.router.navigate(['manage-department']))
    )
  );

  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(departmentAction.UpdateDepartment),
      map((body) => body.department),
      withLatestFrom(
        this.store.pipe(select(departmentSelect.getDepartmentSelected)),
        (department, departmentSelected) => ({
          department,
          departmentSelected,
        })
      ),
      switchMap(
        ({ department, departmentSelected}) =>
          this.departmentService
            .updateDepartment(department, departmentSelected)
            .pipe(
              switchMap(() =>
                from([
                  departmentAction.UpdateDepartmentSuccess(),
                  departmentAction.LoadAllDepartments(),
                  departmentAction.ResetDepartmentSelected(),
                ])
              )
            )
      ),
      tap(() => this.router.navigate(['manage-department']))
    )
  );

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(departmentAction.DeleteDepartment),
      switchMap(({ departmentId }: { departmentId: number }) =>
        this.departmentService
          .deleteDepartment(departmentId)
          .pipe(
            switchMap(() => from([
              departmentAction.DeleteDepartmentSuccess(),
              departmentAction.LoadAllDepartments()
            ]))
          )
      )
    )
  );
}
