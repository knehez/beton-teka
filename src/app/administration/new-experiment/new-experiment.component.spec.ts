import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExperimentComponent } from './new-experiment.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MeasurementTypeService } from 'src/app/_services/measurement-type.service';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { Observable, of } from 'rxjs';

describe('NewExperimentComponent', () => {
  let component: NewExperimentComponent;
  let fixture: ComponentFixture<NewExperimentComponent>;

  const fakeActivatedRoute = {
    get params() { return { /* not used function */ }; },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NewExperimentComponent,
      ],
      imports: [
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TableModule,
        NgbModule,
        CalendarModule,
        MultiSelectModule,
        CardModule
      ]
    }).overrideComponent(NewExperimentComponent, {
      set: {
        providers: [
          FormBuilder,
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          MeasurementTypeService,
          ExperimentService,
          MessageService
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(async () => {
    spyOnProperty(fakeActivatedRoute, 'params', 'get').and.returnValue(of({ id: 1 }));
    fixture = TestBed.createComponent(NewExperimentComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
