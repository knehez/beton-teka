import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteManagementComponent } from './concrete-management.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

describe('ConcreteManagementComponent', () => {
  let component: ConcreteManagementComponent;
  let fixture: ComponentFixture<ConcreteManagementComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ConcreteManagementComponent,
      ],
      imports: [
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TableModule,
        NgbModule
      ]
    }).overrideComponent(ConcreteManagementComponent, {
      set: {
        providers: [
          ConcreteService,
          GeneralRestService,
          MessageService,
          FormBuilder
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ConcreteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
