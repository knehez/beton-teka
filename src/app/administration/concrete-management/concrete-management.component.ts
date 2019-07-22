import { Component, OnInit } from '@angular/core';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { Concrete } from 'src/backend/entities/concrete';

@Component({
  selector: 'app-concrete-management',
  templateUrl: './concrete-management.component.html',
  styleUrls: ['./concrete-management.component.css']
})
export class ConcreteManagementComponent implements OnInit {
  selectedConcreteName: any;
  concreteNames: any[];
  suggestedConcreteNames: any[];
  concreteBeingSearched = [];
  title = 'Betonok';

  constructor(private concreteService: ConcreteService) { }
  showProperties = false;

  ngOnInit() {
    this.concreteBeingSearched = this.getConcreteData();
    this.concreteService.getAllNames().then((res) => {
      this.concreteNames = res as [];
    });
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

  propertiesClick() {
    this.showProperties = !this.showProperties;
  }

  getConcreteData() {
    return [
      { 'id': '1', 'title': 'Screw Driver', 'price': 400, 'stock': 11 },
      { 'id': '2', 'title': 'Nut Volt', 'price': 200, 'stock': 5 },
      { 'id': '3', 'title': 'Resistor', 'price': 78, 'stock': 45 },
      { 'id': '4', 'title': 'Tractor', 'price': 20000, 'stock': 1 },
      { 'id': '5', 'title': 'Roller', 'price': 62, 'stock': 15 },
    ];
  }
}
