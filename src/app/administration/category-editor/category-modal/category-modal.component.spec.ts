import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryModalComponent } from './category-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';

describe('CategoryModalComponent', () => {
  let component: CategoryModalComponent;
  let fixture: ComponentFixture<CategoryModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryModalComponent],
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
      ],
      providers: [
        NgbActiveModal,
        MessageService,
        GeneralRestService
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
