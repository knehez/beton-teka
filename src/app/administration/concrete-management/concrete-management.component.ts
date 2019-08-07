import { Component, OnInit, Input } from '@angular/core';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { Concrete } from 'src/backend/entities/concrete';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { FormBuilder } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-concrete-management',
  templateUrl: './concrete-management.component.html',
  styleUrls: ['./concrete-management.component.css']
})
export class ConcreteManagementComponent implements OnInit {
  searchedConcreteName = '';
  headColumns: any[];
  concretePropertyColumns: any[];
  concretes = [];
  selectedConcrete: any;

  concreteForm = this.formBuilder.group({
    selectedConcrete: [{
      properties: []
    }],
    newConcreteData: this.createConcreteData()
  });

  constructor(
    private concreteService: ConcreteService,
    public restService: GeneralRestService,
    public messageService: MessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.headColumns = [
      { field: 'id', header: 'Azonosító', hidden: false },
      { field: 'label', header: 'Név', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false }
    ];

    this.concretePropertyColumns = [
      { field: 'name', header: 'Név', hidden: false },
      { field: 'value', header: 'Érték', hidden: false }
    ];
  }

  get selectedConcreteData() {
    return this.concreteForm.get('selectedConcrete').value;
  }

  createConcreteData() {
    return this.formBuilder.group({
      name: [''],
      value: ['']
    });
  }

  onConcreteSelect(event) {
    this.concreteForm.get('selectedConcrete').setValue(event.data);
  }

  searchConcrete() {
    this.concreteService.searchConcretes(this.searchedConcreteName)
      .then(res => {
        this.concretes = res['data'] as [];
      });
  }

  addConcreteData() {
    const data = this.concreteForm.get('newConcreteData').value;

    this.selectedConcreteData.properties.push(data);
    this.concreteForm.setControl('newConcreteData', this.createConcreteData());
    this.saveConcrete();
  }

  deleteRow(index) {
    this.selectedConcreteData.properties.splice(index, 1);
    this.saveConcrete();
  }

  saveConcrete() {
    const concreteToSave = this.selectedConcreteData;

    this.concreteService.saveConcrete(concreteToSave)
      .then(res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A tulajdonságok módosításra kerültek.'
        });
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A tulajdonságok módosítása nem sikerült.'
        });
      });
  }
}
