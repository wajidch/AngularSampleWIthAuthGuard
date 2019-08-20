import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWizardWithdrawComponent } from './payment-wizard-withdraw.component';

describe('PaymentWizardWithdrawComponent', () => {
  let component: PaymentWizardWithdrawComponent;
  let fixture: ComponentFixture<PaymentWizardWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWizardWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWizardWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
