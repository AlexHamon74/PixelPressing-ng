import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUsersListComponent } from './customer-users-list.component';

describe('CustomerUsersListComponent', () => {
  let component: CustomerUsersListComponent;
  let fixture: ComponentFixture<CustomerUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUsersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
