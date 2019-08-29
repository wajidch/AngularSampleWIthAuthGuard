import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAccountListComponent } from './demo-account-list.component';

describe('DemoAccountListComponent', () => {
  let component: DemoAccountListComponent;
  let fixture: ComponentFixture<DemoAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
