import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { FormBuiderComponent } from '../../shared/components/form-buider/form-buider.component';
import {
  FormBuilderModel,
  FormBuilderSave,
} from '../../shared/components/form-buider/model/form-buider.inteface';
import { BodyDepartment, Department } from '../../shared/models';
import { DepartmentStoreFacade } from '../../shared/state/facade';
import { getDepartmentFormConfig } from './department-form.config';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  standalone: true,
  imports: [FormBuiderComponent, RouterModule, AsyncPipe, NgIf],
  providers: [DepartmentStoreFacade],
})
export class DepartmentFormComponent implements OnInit, OnDestroy {
  public configForm$!: Observable<FormBuilderModel>;

  private _departmentStoreFacade = inject(DepartmentStoreFacade);
  private _router = inject(Router);

  ngOnInit(): void {
    this.configForm$ = this._departmentStoreFacade.getDepartmentSelected$.pipe(
      map((departmentSelected: Department) =>
        this._getConfigForm(departmentSelected)
      )
    );
  }

  ngOnDestroy(): void {
    this._departmentStoreFacade.resetDepartmentSelected();
  }

  public save(formValue: FormBuilderSave): void {
    const isCreatePage = this._router.url.includes('add')
    const addDepartment = {
      name: formValue['name'],
    } as BodyDepartment;

    isCreatePage
      ? this._departmentStoreFacade.createDepartment(addDepartment)
      : this._departmentStoreFacade.updateDepartment(addDepartment);
  }

  private _getConfigForm(departmentSelected: Department): FormBuilderModel {
    const form = getDepartmentFormConfig(departmentSelected);

    return {
      form,
      returnRoute: ['manage-department'],
    };
  }
}
