import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyDepartment, Department } from '../../models';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.paths.server;

@Injectable()
export class DepartmentsService {
  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${API_URL}/api/departments`)
      .pipe(map((departments: Department[]) => departments));
  }

  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http
      .get<Department>(`${API_URL}/api/departments/${departmentId}`)
      .pipe(map((department: Department) => department));
  }

  createDepartment(department: BodyDepartment) {
    return this.http.post<Department[]>(
      `${API_URL}/api/departments`,
      department
    );
  }

  updateDepartment(department: BodyDepartment | BodyDepartment[] , departmentSelected: Department) {
    return this.http.patch<Department>(
      `${API_URL}/api/departments/${departmentSelected.id}`,
      {
        ...departmentSelected,
        ...department,
      }
    );
  }

  deleteDepartment(departmentId: number) {
    return this.http.delete<Department>(
      `${API_URL}/api/departments/${departmentId}`
    );
  }
}
