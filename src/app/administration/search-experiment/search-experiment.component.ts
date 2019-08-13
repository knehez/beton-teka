import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-experiment',
  templateUrl: './search-experiment.component.html',
  styleUrls: ['./search-experiment.component.css']
})
export class SearchExperimentComponent implements OnInit {

  experimentName = '';
  headColumns: any[];
  experiments = [];
  selectedExperiments = [];
  experimentsToPrint = [];
  printTemplateVisible = false;

  @ViewChild('printTemplateSection')
  printSectionRef: ElementRef;

  constructor(
    private experimentService: ExperimentService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.headColumns = [
      { field: 'id', header: 'ID', hidden: true },
      { field: 'experimentName', header: 'Azonosító', hidden: false },
      { field: 'cups', header: 'Mintaszám', hidden: false },
      { field: 'date', header: 'Dátum', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false },
      { field: 'addsList', header: 'Adalékok', hidden: false },
    ];
  }

  convertAdds(adds) {
    let str = '';
    for (const add of adds) {
      str += `- ${add.quantity} ${add.unit} ${add.name}\n`;
    }
    return str;
  }

  convertDate(date) {
    return new Date(date).toLocaleDateString('hu-HU');
  }

  searchExperiment() {
    this.experiments = [];
    this.selectedExperiments = [];
    this.printTemplateVisible = false;

    this.experimentService.searchExperiment(this.experimentName).then(res => {

      const experiments = res['data'];

      for (const experiment of experiments) {
        experiment.addsList = this.convertAdds(experiment.adds);
        experiment.date = this.convertDate(experiment.date);
      }
      this.experiments = experiments;
    })
      .catch(err => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Sikertelen keresés',
            detail: 'A keresett névre nem található kísérlet.'
          });
        }
      });
  }

  getMeasurementTypesOfExperiment(experiment) {
    const measurementTypes = [];

    experiment.measurements.forEach(measurement => {
      const measurementType = measurement.measurementType.name;
      if (!measurementTypes.includes(measurementType)) {
        measurementTypes.push(measurementType);
      }
    });

    return measurementTypes;
  }

  convertMeasurementArrayToPrint(measurements) {
    const measurementsToPrint = {};

    measurements.forEach(measurement => {
      if (!measurementsToPrint.hasOwnProperty(measurement.group)) {
        measurementsToPrint[measurement.group] = [];
      }

      measurementsToPrint[measurement.group].push(measurement);
    });

    return measurementsToPrint;
  }

  convertSelectedExperimentsToPrint() {
    const experimentsToPrint = this.selectedExperiments.map(
      experiment => Object.assign({}, experiment) // copy object
    );

    for (const experiment of experimentsToPrint) {
      experiment.measurementTypes = this.getMeasurementTypesOfExperiment(experiment);
      experiment.measurements = this.convertMeasurementArrayToPrint(experiment.measurements);
    }

    return experimentsToPrint;
  }

  showPrintTemplate() {
    this.experimentsToPrint = this.convertSelectedExperimentsToPrint();
    this.printTemplateVisible = true;
    this.printSectionRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navigateToEdit(experimentName) {
    this.router.navigate(['experiment', experimentName]);
  }
}
