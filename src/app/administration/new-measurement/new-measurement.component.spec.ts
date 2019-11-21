import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasurementComponent } from './new-measurement.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MeasurementService } from 'src/app/_services/measurement.service';
import { MeasurementFileService } from 'src/app/_services/measurement-file.service';
import { CardModule } from 'primeng/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

describe('NewMeasurementComponent', () => {
  let component: NewMeasurementComponent;
  let fixture: ComponentFixture<NewMeasurementComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NewMeasurementComponent
      ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TabMenuModule,
        ListboxModule,
        TableModule,
        FileUploadModule,
        CardModule,
        HttpClientTestingModule,
        NgbModule
      ],
      providers: [
        FormBuilder,
        MessageService,
        ExperimentService,
        MeasurementService,
        MeasurementFileService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
