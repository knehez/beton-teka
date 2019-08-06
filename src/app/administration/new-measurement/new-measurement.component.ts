import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MeasurementService } from 'src/app/_services/measurement.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-measurement',
  templateUrl: './new-measurement.component.html',
  styleUrls: ['./new-measurement.component.css']
})
export class NewMeasurementComponent implements OnInit {

  measurementColumns: any[];
  searchedExperimentId: string;
  measurementTypes = [];
  filteredMeasurementTypes = [];
  tabs = [];

  measurementForm = this.formBuilder.group({
    selectedMeasurementType: [{
      measurementData: {
        data: []
      }
    }],
    newMeasurementData: this.createMeasurementData()
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private experimentService: ExperimentService,
    private measurementService: MeasurementService
  ) { }

  ngOnInit() {
    this.measurementColumns = [
      { field: 'name', header: 'Név' },
      { field: 'value', header: 'Érték' },
      { field: 'unit', header: 'Mértékegység' },
      { field: 'note', header: 'Megjegyzés' }
    ];
  }

  createMeasurementData() {
    return this.formBuilder.group({
      name: [''],
      value: [''],
      unit: [''],
      note: ['']
    });
  }

  get selectedMeasurementType() {
    return this.measurementForm.get('selectedMeasurementType').value;
  }

  searchExperiment() {
    this.measurementTypes = [];

    this.experimentService.searchExperiment(this.searchedExperimentId)
      .then(res => {
        const experiment = res;
        const measurements = res['measurements'];
        const tabMenus = [];

        if (!measurements || !Array.isArray(measurements) || measurements.length === 0) {
          return this.messageService.add({
            severity: 'warn',
            summary: 'Hiba',
            detail: 'A kísérlethez nem tartozik mérés.'
          });
        }

        for (const measurement of measurements) {
          this.measurementTypes.push({
            label: `${experiment['id']}-${measurement.group} - ${measurement.measurementType.name}`,
            value: measurement
          });

          if (!tabMenus.includes(measurement.group)) {
            tabMenus.push(measurement.group);
          }
        }

        for (const measurementGroup of tabMenus) {
          this.tabs.push({
            label: `${experiment['id']}-${measurementGroup}`,
            data: measurementGroup
          });
        }

        this.measurementForm.get('selectedMeasurementType').setValue(this.measurementTypes[0].value);
        this.filterMeasurements(this.measurementTypes[0].value.group);
      })
      .catch(err => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Azonosító hiba',
            detail: 'A megadott azonosítóval nem létezik mérés.'
          });
        }
      });
  }

  addMeasurementData() {
    const data = this.measurementForm.get('newMeasurementData').value;
    const selectedMeasurementType = this.measurementForm.get('selectedMeasurementType').value;

    selectedMeasurementType.measurementData.data.push(data);
    this.measurementForm.setControl('newMeasurementData', this.createMeasurementData());
    this.saveMeasurement();
  }

  saveMeasurement() {
    const measurementToSave = this.selectedMeasurementType;

    this.measurementService.saveMeasurement(measurementToSave)
      .then(res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A mérés módosításra került.'
        });
      });
  }

  deleteRow(index) {
    const selectedMeasurementType = this.measurementForm.get('selectedMeasurementType').value;
    selectedMeasurementType.measurementData.data.splice(index, 1);
    this.saveMeasurement();
  }

  filterMeasurements (groupId) {
    this.filteredMeasurementTypes = this.measurementTypes.filter(type => type.value.group === groupId);
  }

  filterMeasurementsOnTabClick (tabMenu) {
    const groupId = tabMenu.activeItem.data;
    this.filterMeasurements(groupId);
  }
}
