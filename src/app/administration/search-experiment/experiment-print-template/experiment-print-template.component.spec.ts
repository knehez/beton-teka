import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentPrintTemplateComponent } from './experiment-print-template.component';
import { NgxPrintModule } from 'ngx-print';

describe('ExperimentPrintTemplateComponent', () => {
  let component: ExperimentPrintTemplateComponent;
  let fixture: ComponentFixture<ExperimentPrintTemplateComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ExperimentPrintTemplateComponent,
      ],
      imports: [
        NgxPrintModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentPrintTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
