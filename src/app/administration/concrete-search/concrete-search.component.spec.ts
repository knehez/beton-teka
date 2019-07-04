import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteSearchComponent } from './concrete-search.component';

describe('ConcreteSearchComponent', () => {
  let component: ConcreteSearchComponent;
  let fixture: ComponentFixture<ConcreteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
