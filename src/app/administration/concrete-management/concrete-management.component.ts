import { Component} from '@angular/core';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { FormBuilder, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-concrete-management',
  templateUrl: './concrete-management.component.html',
  styleUrls: ['./concrete-management.component.css']
})
export class ConcreteManagementComponent {
  searchName = '';
  concretes = [];
  selectedConcrete: any;

  headColumns = [
    { field: 'id', header: 'Azonosító', hidden: false },
    { field: 'label', header: 'Név', hidden: false },
    { field: 'description', header: 'Leírás', hidden: false }
  ];

  propertiesColumns = [
    { field: 'name', header: 'Név', hidden: false },
    { field: 'value', header: 'Érték', hidden: false }
  ];

  nameValueForm = this.fb.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]]
  });

  constructor(private concreteService: ConcreteService,
    private restService: GeneralRestService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  onConcreteSelect(event) {
    this.selectedConcrete = event.data;
    // remove all old values
    this.nameValueForm.reset();
  }

  search() {
    this.concreteService.searchConcretes(this.searchName)
      .then(res => {
        this.concretes = res['data'] as [];
      });
  }

  addConcreteData() {
    this.selectedConcrete.properties.push(this.nameValueForm.value);
    this.nameValueForm.reset();
    this.saveConcrete();
  }

  deleteRow(index) {
    this.selectedConcrete.properties.splice(index, 1);
    this.saveConcrete();
  }

  saveConcrete() {
    this.concreteService.saveConcrete(this.selectedConcrete)
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
