import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBWordsComponent } from './admin-b-words.component';

describe('AdminBWordsComponent', () => {
  let component: AdminBWordsComponent;
  let fixture: ComponentFixture<AdminBWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
