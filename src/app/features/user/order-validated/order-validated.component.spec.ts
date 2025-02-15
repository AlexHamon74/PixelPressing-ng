import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderValidatedComponent } from './order-validated.component';

describe('OrderValidatedComponent', () => {
  let component: OrderValidatedComponent;
  let fixture: ComponentFixture<OrderValidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderValidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
