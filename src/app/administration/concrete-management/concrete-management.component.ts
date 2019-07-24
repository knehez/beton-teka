import { Component, OnInit, Input } from '@angular/core';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { Concrete } from 'src/backend/entities/concrete';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-concrete-management',
  templateUrl: './concrete-management.component.html',
  styleUrls: ['./concrete-management.component.css']
})
export class ConcreteManagementComponent implements OnInit {
  @Input() originalData: string;
  searchedConcreteName = '';
  concreteNames: string[];
  suggestedConcreteNames: any[];
  concreteBeingSearched = [];
  allConcreteData: any[];
  filteredConcreteData: any[];
  searchedConcreteData: any[];
  searchDetailedData = [];
  selectedConcrete = '';
  selectedConcrete2 = '';
  headColumns: any[];
  detailsColumns: any[];

  constructor(
    private concreteService: ConcreteService,
    public restService: GeneralRestService,
    public messageService: MessageService,
    // public activeModal: NgbActiveModal,
  ) { }
  showProperties = false;

  ngOnInit() {


    this.headColumns = [
      { field: 'id', header: 'Id', hidden: true },
      { field: 'label', header: 'Név', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false },
      { field: 'properties', header: 'Tulajdonságok', hidden: true }
    ];
    this.detailsColumns = [
      { field: 'name', header: 'Név', hidden: false },
      { field: 'value', header: 'Érték', hidden: false },
    ];
  }


  filterNamesMultiple(event) {
    const query = event.query;
    this.concreteService.getAllNames().then(concreteNames => {
      this.suggestedConcreteNames = this.filterName(query, concreteNames as []);
    });
  }

  filterName(query, concreteNames: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < concreteNames.length; i++) {
      const concName = concreteNames[i];
      if (concName.toLowerCase().includes(query.toLowerCase()) === true) {
        filtered.push(concName);
      }
    }
    return filtered;

  }

  filterDataMultiple(event) {
    const query = event.target.value;
    this.concreteService.getAllData().then(allConcreteData => {
      this.filteredConcreteData = this.filterData(query, allConcreteData as []);
    });
  }

  filterData(query, allConcreteData: any[]): any[] {
    const filtered1: any[] = [];
    for (let i = 0; i < allConcreteData.length; i++) {
      const concData = allConcreteData[i];
      if (concData.label.includes(query.toLowerCase()) === true) {
        filtered1.push(concData);
      }
    }
    for (let i = 0; i < allConcreteData.length; i++) {
      const concData = allConcreteData[i];
      if (concData.description.includes(query.toLowerCase()) === true) {
        filtered1.push(concData);
      }
    }
    return filtered1;
  }

  propertiesClick() {
    if (this.selectedConcrete.trim() === '') {
      this.concreteService.getAllData().then((res1) => {
        this.allConcreteData = res1 as [];
        this.showProperties = !this.showProperties;
        this.searchedConcreteData = this.allConcreteData;
      });
    } else {
      this.showProperties = !this.showProperties;
      this.searchedConcreteData = this.filteredConcreteData;

    }
  }

  onRowSelect(event) {
    this.searchDetailedData = [];
    const properties = this.selectedConcrete2['properties'];
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        const element = properties[key];
        this.searchDetailedData.push({ name: key, value: element });
      }
    }
    // this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'Vin: ' + event.data.vin });
  }

  onDetailsRowSave(event) {
    const obj = {};
    for (const value of this.searchDetailedData) {
      obj[value.name] = value.value;
    }
    this.selectedConcrete2['properties'] = obj;
    this.editData();
  }


  editData() {
    const concreteToSave = Object.assign({}, this.selectedConcrete2); // copy object

    this.restService.objectName = 'concretes';

    this.restService.update(concreteToSave)
      .then(res => {
        if (!res['success']) {
          this.selectedConcrete2['properties'] = this.originalData;
          return;
        }

        // this.activeModal.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A beton módosításra került.'
        });
      })
      .catch(err => {
        this.selectedConcrete2['properties'] = this.originalData;

        // this.activeModal.close();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A beton módosítása nem sikerült.'
        });
      });
  }

  debug(obj) {
    console.log(obj);
    return obj;
  }
}
