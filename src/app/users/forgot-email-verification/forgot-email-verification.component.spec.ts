import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotEmailVerificationComponent } from './forgot-email-verification.component';

describe('ForgotEmailVerificationComponent', () => {
  let component: ForgotEmailVerificationComponent;
  let fixture: ComponentFixture<ForgotEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
