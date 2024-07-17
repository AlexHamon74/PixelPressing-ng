import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUsersEditComponent } from './employee-users-edit.component';

describe('EmployeeUsersEditComponent', () => {
  let component: EmployeeUsersEditComponent;
  let fixture: ComponentFixture<EmployeeUsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUsersEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
