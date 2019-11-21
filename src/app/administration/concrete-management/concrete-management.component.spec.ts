import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { element } from 'protractor';

describe('ConcreteManagementComponent', () => {
  let component: ConcreteManagementComponent;
  let fixture: ComponentFixture<ConcreteManagementComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ConcreteManagementComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
    component.concretes = [
      { id: 1, description: 'desc1', name: 'name1' },
      {
        id: 2, description: 'desc2', name: 'name2',
        properties: [
          { name: 'name1', value: '1' },
          { name: 'name2', value: '2' },
          { name: 'name3', value: '3' }
        ]
      },
      { id: 3, description: 'desc3', name: 'name3' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display 3 concretes in the table', async () => {
    const inputs = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(inputs.length).toBe(3);
  });

  it('click on the second row in the table', async () => {
    // click on the second row
    const row = fixture.debugElement.queryAll(By.css('.ui-selectable-row'))[1];
    row.nativeElement.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(inputs.length).toBe(6);
  });

  it('click on the second row and remove the second row in the details table', async () => {
    // click on the second row
    const row = fixture.debugElement.queryAll(By.css('.ui-selectable-row'))[1];
    row.nativeElement.click();
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('#deleteButton_1'));
    deleteButton.nativeElement.click();
    fixture.detectChanges();
    const inputs = fixture.debugElement.queryAll(By.css('tbody tr'));
    // egy sorral kevesebb lesz
    expect(inputs.length).toBe(5);
  });

});
