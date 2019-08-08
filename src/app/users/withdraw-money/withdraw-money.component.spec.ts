import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawMoneyComponent } from './withdraw-money.component';

describe('WithdrawRequestComponent', () => {
  let component: WithdrawMoneyComponent;
  let fixture: ComponentFixture<WithdrawMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
