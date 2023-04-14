import {
  TableData,
  TableDataRowActions,
} from '../shared/components/table/model/table.interface';
import { Department, User } from '../shared/models';

export enum TypeTablesManageDepartement {
  departments = 'departments',
  departmentsUser = 'departmentsUser',
}

export const configDepartmentTable = (
  data: Department[]
): TableData<Department> => ({
  configTable: {
    idTable: TypeTablesManageDepartement.departments,
    dataKey: 'id',
    title: 'Department',
    headerNames: ['ID', 'name', ''],
    attribute: [
      {
        name: 'id',
        actions: [],
      },
      {
        name: 'name',
        actions: [],
      },
      {
        name: '',
        actions: [TableDataRowActions.edit, TableDataRowActions.remove],
      },
    ],
  },
  data,
});

export const configUserTable = (data: User[]): TableData<User> => ({
  configTable: {
    idTable: TypeTablesManageDepartement.departmentsUser,
    dataKey: 'id',
    title: 'Users within department',
    headerNames: ['ID', 'name', 'email', ''],
    attribute: [
      {
        name: 'id',
        actions: [],
      },
      {
        name: 'name',
        actions: [],
      },
      {
        name: 'email',
        actions: [],
      },
      {
        name: '',
        actions: [TableDataRowActions.edit, TableDataRowActions.remove],
      },
    ],
  },
  data,
});
