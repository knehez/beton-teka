import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMeasurementComponent } from './search-measurement.component';

describe('SearchMeasurementComponent', () => {
  let component: SearchMeasurementComponent;
  let fixture: ComponentFixture<SearchMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
