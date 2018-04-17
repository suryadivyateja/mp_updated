import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFinancialsComponent } from './payment-financials.component';

describe('PaymentFinancialsComponent', () => {
  let component: PaymentFinancialsComponent;
  let fixture: ComponentFixture<PaymentFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFinancialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
