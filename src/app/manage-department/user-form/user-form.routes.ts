import { Routes } from '@angular/router';

export const UserFormRoutes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./user-form.component').then(
        (mod) => mod.UserFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./user-form.component').then(
        (mod) => mod.UserFormComponent
      ),
  },
];
