import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsSellerComponent } from './order-details-seller.component';

describe('OrderDetailsSellerComponent', () => {
  let component: OrderDetailsSellerComponent;
  let fixture: ComponentFixture<OrderDetailsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
