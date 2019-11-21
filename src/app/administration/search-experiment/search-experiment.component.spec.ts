import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExperimentComponent } from './search-experiment.component';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ExperimentPrintTemplateComponent } from './experiment-print-template/experiment-print-template.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchExperimentComponent', () => {
  let component: SearchExperimentComponent;
  let fixture: ComponentFixture<SearchExperimentComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        SearchExperimentComponent,
        ExperimentPrintTemplateComponent,
      ],
      imports: [
        CardModule,
        TableModule,
        NgbModule,
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPrintModule,
        HttpClientTestingModule,
      ],
      providers: [
        ExperimentService,
        MessageService,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
