import { TestBed } from '@angular/core/testing';

import { UserDepartmentService } from './user-department.service';

describe('UserDepartmentService', () => {
  let service: UserDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
