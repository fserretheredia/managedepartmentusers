import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BodyUser, Department, User } from '../../models';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.paths.server}/api/departments`;

@Injectable()
export class UserDepartmentService {
  constructor(private http: HttpClient) {}

  getAllUsersDepartment(department: Department): Observable<User[]> {
    return this.http
      .get<User[]>(`${API_URL}/${department.id}/users`)
      .pipe(
        map((users: User[]) =>
          users.filter((res) => department.users.includes(res.id))
        )
      );
  }
  getUserDepartment(departmentId: number, userId: number): Observable<User> {
    return this.http
      .get<User>(`${API_URL}/${departmentId}/users/${userId}`)
      .pipe(map((user: User) => user));
  }

  createUserDepartment(departmentId: number, user: BodyUser): Observable<User> {
    return this.http.post<User>(`${API_URL}/${departmentId}/users/`, user);
  }

  updateUserDepartment(departmentId: number, bodyUser: BodyUser, userSelected: User) {
    return this.http.patch<User>(
      `${API_URL}/${departmentId}/users/${userSelected.id}`,
      bodyUser
    );
  }

  deleteUserDepartment(departmentId: number, userId: number) {
    return this.http.delete<User>(`${API_URL}/${departmentId}/users/${userId}`);
  }
}
