import { Routes } from '@angular/router';

export const ManageDepartmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./manage-department.component').then(
        (mod) => mod.ManageDepartmentComponent
      ),
    children: [],
  },
  {
    path: 'department',
    loadChildren: () =>
      import('./department-form/department-form.routes').then(
        (m) => m.DepartmentFormRoutes
      ),
  },
  {
    path: 'user-department',
    loadChildren: () =>
      import('./user-form/user-form.routes').then((m) => m.UserFormRoutes),
  },
];
