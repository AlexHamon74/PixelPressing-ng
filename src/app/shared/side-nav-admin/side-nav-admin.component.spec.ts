import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavAdminComponent } from './side-nav-admin.component';

describe('SideNavAdminComponent', () => {
  let component: SideNavAdminComponent;
  let fixture: ComponentFixture<SideNavAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
