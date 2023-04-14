import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'manage-department', pathMatch: 'full' },
  {
    path: 'manage-department',
    loadChildren: () =>
      import('./manage-department/manage-department.router').then(
        (mod) => mod.ManageDepartmentRoutes
      ),
  },
  // {
  //   path: 'department',
  //   children: [
  //     {
  //       path: 'add',
  //       loadComponent: () =>
  //         import('./manage-department/department-form/department-form.component').then(
  //           (mod) => mod.DepartmentFormComponent
  //         ),
  //     },
  //     {
  //       path: 'edit/:id',
  //       loadComponent: () =>
  //         import('./manage-department/department-form/department-form.component').then(
  //           (mod) => mod.DepartmentFormComponent
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: 'user-department',
  //   children: [
  //     {
  //       path: 'add',
  //       loadComponent: () =>
  //         import('./manage-department/user-form/user-form.component').then(
  //           (mod) => mod.UserFormComponent
  //         ),
  //     },
  //     {
  //       path: 'edit/:id',
  //       loadComponent: () =>
  //         import('./manage-department/user-form/user-form.component').then(
  //           (mod) => mod.UserFormComponent
  //         ),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
