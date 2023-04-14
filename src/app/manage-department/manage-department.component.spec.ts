import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepartmentComponent } from './manage-department.component';

describe('ManageDepartmentComponent', () => {
  let component: ManageDepartmentComponent;
  let fixture: ComponentFixture<ManageDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
