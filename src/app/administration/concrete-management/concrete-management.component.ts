import { Component, OnInit } from '@angular/core';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { Concrete } from 'src/backend/entities/concrete';

@Component({
  selector: 'app-concrete-management',
  templateUrl: './concrete-management.component.html',
  styleUrls: ['./concrete-management.component.css']
})
export class ConcreteManagementComponent implements OnInit {
  searchedConcreteName = '';
  concreteNames: string[];
  suggestedConcreteNames: any[];
  concreteBeingSearched = [];
  allConcreteData: any[];
  filteredConcreteData: any[];
  searchedConcreteData: any[];
  selectedConcrete = '';
  cols: any[];

  constructor(private concreteService: ConcreteService) { }
  showProperties = false;

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Id', hidden: true },
      { field: 'label', header: 'Név', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false },
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
    this.selectedConcrete = query;
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
    // this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'Vin: ' + event.data.vin });
  }

}
