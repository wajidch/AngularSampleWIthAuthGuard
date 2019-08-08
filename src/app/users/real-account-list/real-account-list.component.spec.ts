import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealAccountListComponent } from './real-account-list.component';

describe('RealAccountListComponent', () => {
  let component: RealAccountListComponent;
  let fixture: ComponentFixture<RealAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
