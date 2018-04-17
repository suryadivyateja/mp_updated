import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsBuyerComponent } from './order-details-buyer.component';

describe('OrderDetailsBuyerComponent', () => {
  let component: OrderDetailsBuyerComponent;
  let fixture: ComponentFixture<OrderDetailsBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
