import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWizardDepositComponent } from './payment-wizard-deposit.component';

describe('PaymentWizardComponent', () => {
  let component: PaymentWizardDepositComponent;
  let fixture: ComponentFixture<PaymentWizardDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWizardDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWizardDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
