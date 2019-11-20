import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditorComponent } from './category-editor.component';
import { TreeModule } from 'primeng/tree';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TreeDragDropService, MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { NgbModal, NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from 'primeng/components/common/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryEditorComponent', () => {
  let component: CategoryEditorComponent;
  let fixture: ComponentFixture<CategoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryEditorComponent,
      ],
      imports: [
        TreeModule,
        InputSwitchModule,
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule
      ]
    }).overrideComponent(CategoryEditorComponent, {
      set: {
        providers: [
          TreeDragDropService,
          MessageService,
          GeneralRestService,
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
