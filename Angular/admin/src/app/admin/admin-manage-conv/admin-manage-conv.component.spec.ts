import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageConvComponent } from './admin-manage-conv.component';

describe('AdminManageConvComponent', () => {
  let component: AdminManageConvComponent;
  let fixture: ComponentFixture<AdminManageConvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageConvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
