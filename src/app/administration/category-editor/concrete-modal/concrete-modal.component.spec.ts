import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteModalComponent } from './concrete-modal.component';

describe('ConcreteModalComponent', () => {
  let component: ConcreteModalComponent;
  let fixture: ComponentFixture<ConcreteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
