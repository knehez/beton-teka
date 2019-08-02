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
  measurementType = [];

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
    private messageServices: MessageService,
    private experimentServices: ExperimentService,
    private measurementServices: MeasurementService
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
    this.measurementType = [];

    this.experimentServices.searchExperiment(this.searchedExperimentId)
      .then(res => {
        const measurements = res['measurements'];
        for (const measurement of measurements) {
          this.measurementType.push({
            label: measurement.measurementType.name,
            value: measurement
          });
        }
      });
  }

  addMeasurementData() {
    const data = this.measurementForm.get('newMeasurementData').value;
    const selectedMeasurementType = this.measurementForm.get('selectedMeasurementType').value;

    selectedMeasurementType.measurementData.data.push(data);
    this.measurementForm.setControl('newMeasurementData', this.createMeasurementData());
  }

  saveMeasurement() {
    const measurementToSave = this.selectedMeasurementType;

    this.measurementServices.saveMeasurement(measurementToSave)
      .then(res => {
        this.messageServices.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A mérés módosításra került.'
        });
      });
  }

}
