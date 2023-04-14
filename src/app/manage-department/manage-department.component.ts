import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { TableComponent } from '../shared/components';
import {
  TableData,
  TableDataRowActions,
} from '../shared/components/table/model/table.interface';
import { Department, User } from '../shared/models';
import {
  DepartmentStoreFacade,
  UserDepartmentStoreFacade,
} from '../shared/state/facade';
import {
  configDepartmentTable,
  configUserTable,
  TypeTablesManageDepartement,
} from './table.models';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.scss'],
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonModule, RouterModule],
  providers: [DepartmentStoreFacade, UserDepartmentStoreFacade],
})
export class ManageDepartmentComponent implements OnInit {
  public departments$!: Observable<TableData<Department>>;
  public departmentUsers$!: Observable<TableData<User>>;
  public departmentsSelected$!: Observable<Department>;

  private _router = inject(Router);
  private _departmentStoreFacade = inject(DepartmentStoreFacade);
  private _userDepartmentStoreFacade = inject(UserDepartmentStoreFacade);

  ngOnInit(): void {
    this._departmentStoreFacade.loadAllDepartments();

    this.departments$ = this._departmentStoreFacade.getAllDepartments$.pipe(
      map((departments: Department[]) => configDepartmentTable(departments))
    );
    this.departmentsSelected$ =
      this._departmentStoreFacade.getDepartmentSelected$;

    this.departmentUsers$ =
      this._userDepartmentStoreFacade.getAllUsersDepartment$.pipe(
        map((departmentUsers: User[]) => configUserTable(departmentUsers))
      );
  }

  selectedTableRow(selectedRowTable: {
    idTable: string;
    rowValue: unknown;
    selectRow: boolean;
  }): void {
    if (selectedRowTable.idTable === TypeTablesManageDepartement.departments) {
      this._selectRowDepartmentTable(selectedRowTable);
    }
  }

  selectAction(selectAction: {
    action: string;
    rowData: unknown;
    idTable: string;
  }): void {
    const manageActions = {
      [TypeTablesManageDepartement.departments]: (
        action: TableDataRowActions
      ) => {
        const department = selectAction.rowData as Department;
        const departmentsActions = {
          [TableDataRowActions.remove]: () =>
            this._departmentStoreFacade.deleteDepartment(department.id),
          [TableDataRowActions.edit]: () => {
            this._departmentStoreFacade.loadDepartmentsById(department.id),
            this._router.navigate([
              'manage-department',
              'department',
              'edit',
              department.id,
            ])
          }
        };
        return departmentsActions[action]();
      },
      [TypeTablesManageDepartement.departmentsUser]: (
        action: TableDataRowActions
      ) => {
        const user = selectAction.rowData as User;
        const departmentsActions = {
          [TableDataRowActions.remove]: () =>
            this._userDepartmentStoreFacade.deleteUserDepartment(user.id),
          [TableDataRowActions.edit]: () => {
            console.log(user.id)
          this._userDepartmentStoreFacade.loadUserDepartment(user.id),
            this._router.navigate([
              'manage-department',
              'user-department',
              'edit',
              user.id,
            ]);
          }
        };
        return departmentsActions[action]();
      },
    };

    manageActions[selectAction.idTable as TypeTablesManageDepartement](
      selectAction.action as TableDataRowActions
    );
  }

  createDepartment() {
    this._router.navigate(['manage-department', 'department', 'add']);
  }

  createUserDepartment() {
    this._router.navigate(['manage-department', 'user-department', 'add']);
  }

  private _selectRowDepartmentTable(selectedRowTable: {
    idTable: string;
    rowValue: unknown;
    selectRow: boolean;
  }): void {
    if (selectedRowTable.selectRow) {
      const department = selectedRowTable.rowValue as Department;
      this._departmentStoreFacade.loadDepartmentsById(department.id);
      this._userDepartmentStoreFacade.loadAllUsersDepartment(department);
    } else {
      this._userDepartmentStoreFacade.resetListUserDepartment();
      this._departmentStoreFacade.resetDepartmentSelected();
    }
  }
}
