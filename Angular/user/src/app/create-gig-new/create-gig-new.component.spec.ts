import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGigNewComponent } from './create-gig-new.component';

describe('CreateGigNewComponent', () => {
  let component: CreateGigNewComponent;
  let fixture: ComponentFixture<CreateGigNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGigNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGigNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
