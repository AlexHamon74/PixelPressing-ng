import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUsersCreateComponent } from './employee-users-create.component';

describe('EmployeeUsersCreateComponent', () => {
  let component: EmployeeUsersCreateComponent;
  let fixture: ComponentFixture<EmployeeUsersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUsersCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
