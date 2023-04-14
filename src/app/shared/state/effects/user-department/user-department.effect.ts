import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { BodyUser, Department, User } from 'src/app/shared/models';
import { UserDepartmentService } from 'src/app/shared/services/user-department/user-department.service';
import * as userDepartmentAction from '../../actions/user-department.actions';
import * as userDepartmentSelector from '../../selectors/user-department/user-department.selector';
import * as departmentAction from '../../actions/department.actions';
import * as departmentSelect from '../../selectors/department/department.selector';
import { Router } from '@angular/router';

@Injectable()
export class UserDepartmentEffect {
  constructor(
    private actions$: Actions,
    private userDepartmentService: UserDepartmentService,
    private store: Store,
    private router: Router
  ) {}

  loadAllUsersDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDepartmentAction.LoadAllUsersDepartment),
      switchMap(({ department }: { department: Department }) =>
        this.userDepartmentService.getAllUsersDepartment(department).pipe(
          switchMap((departmentUsers: User[]) =>
            from([
              userDepartmentAction.LoadAllUsersDepartmentSuccess({
                departmentUsers,
              }),
            ])
          )
        )
      )
    )
  );

  loadUserDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDepartmentAction.LoadUserDepartment),
      withLatestFrom(
        this.store.pipe(select(departmentSelect.getDepartmentSelected)),
        (user, department) => ({
          userId: user.userId,
          department,
        })
      ),
      switchMap(
        ({ userId, department }: { userId: number; department: Department }) =>
          this.userDepartmentService
            .getUserDepartment(department.id, userId)
            .pipe(
              switchMap((departmentUserSelected: User) =>
                from([
                  userDepartmentAction.LoadUserDepartmentSuccess({
                    departmentUserSelected,
                  }),
                ])
              )
            )
      )
    )
  );

  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDepartmentAction.CreateUserDepartment),
      withLatestFrom(
        this.store.pipe(select(departmentSelect.getDepartmentSelected)),
        (user, department) => ({
          user: user.user,
          department,
        })
      ),
      switchMap(
        ({ user, department }: { user: BodyUser; department: Department }) =>
          this.userDepartmentService
            .createUserDepartment(department.id, user)
            .pipe(
              switchMap((user: User) =>
                from([
                  userDepartmentAction.CreateUserDepartmentSuccess(),
                  departmentAction.UpdateDepartment({
                    department: {
                      ...department,
                      users: [...department.users, user.id]
                    }
                  })
                ])
              ),
              tap(() => this.router.navigate(['manage-department']))
            )
      )
    )
  );

  updateUserDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDepartmentAction.UpdateUserDepartment),
      map(({newDepartmentId, user}) => ({ newDepartmentId, user })),
      withLatestFrom(
        this.store.pipe(select(userDepartmentSelector.getUserDepartmentSelected)),
        this.store.pipe(select(departmentSelect.getDepartmentSelected)),
        this.store.pipe(select(departmentSelect.getAllDepartments)),
        (updateUser, userDepartmentSelected, departmentSelected, allDepartments) => ({
          updateUser, userDepartmentSelected, departmentSelected, allDepartments
        })
      ),
      switchMap(
        ({ updateUser, userDepartmentSelected, departmentSelected, allDepartments}) =>
          this.userDepartmentService
            .updateUserDepartment(updateUser.newDepartmentId, updateUser.user, userDepartmentSelected)
            .pipe(
              switchMap(() =>
                from([
                  userDepartmentAction.UpdateUserDepartmentSuccess(),
                  departmentAction.UpdateDepartment({
                    department: allDepartments.map((d) => {
                      const findUser = d.users.some((userId: number) => userId === userDepartmentSelected.id)

                      if (d.id === updateUser.newDepartmentId && !findUser) {
                        d.users.push(userDepartmentSelected.id)
                      }

                      if (d.id !== updateUser.newDepartmentId && findUser) {
                        d.users.filter((userId: number) => userId !== userDepartmentSelected.id)
                      }

                      return d;
                    })
                  }),
                  departmentAction.UpdateDepartment({
                    department: {
                      ...departmentSelected,
                      users: departmentSelected.users.filter(id => id !== userDepartmentSelected.id)
                    }
                  })
                ])
              ),
              tap(() => this.router.navigate(['manage-department']))
            )
      )
    )
  );

  deleteUserDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDepartmentAction.DeleteUserDepartment),
      withLatestFrom(
        this.store.pipe(select(departmentSelect.getDepartmentSelected)),
        (user, department) => ({
          userId: user.userId,
          department,
        })
      ),
      switchMap(
        ({ userId, department }: { userId: number; department: Department }) =>
          this.userDepartmentService
            .deleteUserDepartment(department.id, userId)
            .pipe(
              switchMap(() =>
                from([
                  userDepartmentAction.DeleteUserDepartmentSuccess(),
                  departmentAction.UpdateDepartment({
                    department: {
                      ...department,
                      users: department.users.filter(id => id !== userId)
                    }
                  }),
                  userDepartmentAction.LoadAllUsersDepartment({ department })
                ])
              )
            )
      )
    )
  );
}
