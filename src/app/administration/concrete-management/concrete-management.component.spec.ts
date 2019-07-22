import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteManagementComponent } from './concrete-management.component';

describe('ConcreteManagementComponent', () => {
  let component: ConcreteManagementComponent;
  let fixture: ComponentFixture<ConcreteManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
