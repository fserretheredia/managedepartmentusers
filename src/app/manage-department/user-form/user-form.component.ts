import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { FormBuiderComponent } from 'src/app/shared/components/form-buider/form-buider.component';
import {
  FormBuilderModel,
  FormBuilderSave,
} from 'src/app/shared/components/form-buider/model/form-buider.inteface';
import { BodyUser, Department, User } from 'src/app/shared/models';
import {
  DepartmentStoreFacade,
  UserDepartmentStoreFacade,
} from 'src/app/shared/state/facade';
import { getUserFormConfig } from './user-form.config';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [FormBuiderComponent, CommonModule],
  providers: [DepartmentStoreFacade, UserDepartmentStoreFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnDestroy {
  public configForm$!: Observable<FormBuilderModel>;

  private _isCreatePage!: boolean;

  private _departmentStoreFacade = inject(DepartmentStoreFacade);
  private _userDepartmentStoreFacade = inject(UserDepartmentStoreFacade);
  private _router = inject(Router);

  ngOnInit(): void {
    this._isCreatePage = this._router.url.includes('add');
    this.configForm$ = this._userDepartmentStoreFacade.getUserDepartmentSelected$.pipe(
      withLatestFrom(
        this._departmentStoreFacade.getDepartmentSelected$,
        this._departmentStoreFacade.getAllDepartments$
      ),
      map(
        ([user, departmentSelected, departments]: [
          User,
          Department,
          Department[],
        ]) => this._getConfigForm(departmentSelected, departments, user)
      ),
      catchError(() => {
        this._router.navigate(['manage-department'])
        return of(null)
      })
    );
  }

  ngOnDestroy() {
    this._departmentStoreFacade.resetDepartmentSelected();
    this._userDepartmentStoreFacade.resetDepartmentUserSelected();
    this._userDepartmentStoreFacade.resetListUserDepartment();
  }

  public save(formValue: FormBuilderSave) {
    if (this._isCreatePage) {
      const addUser = {
        name: formValue['name'],
        email: formValue['email'],
      } as BodyUser;

      this._userDepartmentStoreFacade.createUserDepartment(addUser);
    } else {
      const editUser = {
        user: {
          id: formValue['id'],
          name: formValue['name'],
          email: formValue['email'],
        },
        departmentId: (formValue['department'] as any).id,
      } as any;
      this._userDepartmentStoreFacade.updateUserDepartment(
        editUser.departmentId,
        editUser.user
      );
    }
  }

  private _getConfigForm(
    departmentSelected: Department,
    departments: Department[],
    user: User
  ): FormBuilderModel {
    const form = getUserFormConfig(
      departmentSelected,
      departments,
      user,
      this._isCreatePage
      );

    return {
      form,
      returnRoute: ['manage-department'],
    };
  }
}
