import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUsersListComponent } from './employee-users-list.component';

describe('EmployeeUsersListComponent', () => {
  let component: EmployeeUsersListComponent;
  let fixture: ComponentFixture<EmployeeUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUsersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
