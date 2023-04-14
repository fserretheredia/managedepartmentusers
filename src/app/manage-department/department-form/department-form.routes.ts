import { Routes } from '@angular/router';

export const DepartmentFormRoutes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./department-form.component').then(
        (mod) => mod.DepartmentFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./department-form.component').then(
        (mod) => mod.DepartmentFormComponent
      ),
  },
];
