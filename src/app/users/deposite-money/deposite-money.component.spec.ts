import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeMoneyComponent } from './deposite-money.component';

describe('DepositeMoneyComponent', () => {
  let component: DepositeMoneyComponent;
  let fixture: ComponentFixture<DepositeMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
