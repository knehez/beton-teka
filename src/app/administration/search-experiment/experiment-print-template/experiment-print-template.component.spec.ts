import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentPrintTemplateComponent } from './experiment-print-template.component';

describe('ExperimentPrintTemplateComponent', () => {
  let component: ExperimentPrintTemplateComponent;
  let fixture: ComponentFixture<ExperimentPrintTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentPrintTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentPrintTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
