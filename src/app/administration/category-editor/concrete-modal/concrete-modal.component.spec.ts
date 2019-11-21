import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteModalComponent } from './concrete-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { AutoCompleteModule } from 'primeng/autocomplete';

describe('ConcreteModalComponent', () => {
  let component: ConcreteModalComponent;
  let fixture: ComponentFixture<ConcreteModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ConcreteModalComponent,
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
        NgbModule,
        AutoCompleteModule
      ]
    }).overrideComponent(ConcreteModalComponent, {
      set: {
        providers: [
          NgbActiveModal,
          MessageService,
          GeneralRestService,
          ConcreteService,
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ConcreteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
