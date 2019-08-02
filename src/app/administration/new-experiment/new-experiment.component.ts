import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MeasurementTypeService } from 'src/app/_services/measurement-type.service';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {

  types;

  newExperimentForm = this.formBuilder.group({
    experimentName: ['', Validators.minLength(3)],
    cups: ['', Validators.required],
    adds: this.formBuilder.array([this.createExpItem()]),
    date: [new Date()],
    description: [''],
    measurements: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private measurementTypeService: MeasurementTypeService,
    private experimentService: ExperimentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.measurementTypeService.getTypes().then(res => {

      const types = [];

      // tslint:disable-next-line: forin
      for (const i in res) {
        types.push({
          label: res[i].name,
          value: {
            measurementTypeId: res[i].id,
            measurementData: {}
          }
        });
      }

      this.types = types;
    });
  }

  createExpItem(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      quantity: [''],
      unit: [''],
    });
  }

  get adds() {
    return this.newExperimentForm.get('adds') as FormArray;
  }

  addItem() {
    this.adds.push(this.createExpItem());
  }

  onItemDeleted(index) {
    this.adds.removeAt(index);
  }

  saveExperiment() {
    const experiment = this.newExperimentForm.value;
    this.experimentService.saveExperiment(experiment)
      .then(res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres hozzáadás',
          detail: 'A kísérlet hozzáadásra került.'
        });
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen hozzáadás',
          detail: 'A kísérlet hozzáadása nem sikerült.'
        });
      });
  }
}
