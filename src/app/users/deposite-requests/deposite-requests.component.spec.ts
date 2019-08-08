import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeRequestsComponent } from './deposite-requests.component';

describe('DepositeRequestsComponent', () => {
  let component: DepositeRequestsComponent;
  let fixture: ComponentFixture<DepositeRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
