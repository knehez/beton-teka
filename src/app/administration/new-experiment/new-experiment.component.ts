import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MeasurementTypeService } from 'src/app/_services/measurement-type.service';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {

  types;
  isNewExperiment = true;

  newExperimentForm = this.formBuilder.group({
    id: [],
    experimentName: ['', Validators.minLength(3)],
    cups: ['', Validators.required],
    adds: this.formBuilder.array([this.createExpItem()]),
    date: [new Date()],
    description: [''],
    measurements: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private measurementTypeService: MeasurementTypeService,
    private experimentService: ExperimentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const fillMeasurementTypes = this.getMeasurementTypes()
      .then(measurementTypes => this.fillMultiSelectWithMeasurementTypes(measurementTypes));

    this.route.params.subscribe(params => {
      const experimentId = params['id'];

      if (!experimentId) {
        return;
      }

      this.isNewExperiment = false;

      fillMeasurementTypes
        .then(() => this.getExperimentData(experimentId))
        .then(experiment => this.fillFormWithExperimentData(experiment));
    });
  }

  getMeasurementTypes() {
    return this.measurementTypeService.getTypes();
  }

  fillMultiSelectWithMeasurementTypes(measurementTypes) {
    const types = [];

    // tslint:disable-next-line: forin
    for (const i in measurementTypes) {
      types.push({
        label: measurementTypes[i].name,
        value: {
          measurementTypeId: measurementTypes[i].id,
          measurementData: {}
        }
      });
    }

    this.types = types;
  }

  getExperimentData(experimentId) {
    return this.experimentService.searchExperimentById(experimentId)
      .then(res => {
        const experiment = res['data'];
        experiment.date = new Date(experiment.date);
        return experiment;
      });
  }

  fillFormWithExperimentData(experiment) {
    this.newExperimentForm.patchValue(experiment);

    const adds = [];
    experiment.adds.forEach(add => {
      adds.push(this.formBuilder.group({
        name: [add.name],
        quantity: [add.quantity],
        unit: [add.unit],
      }));
    });

    this.newExperimentForm.setControl('adds', this.formBuilder.array(adds));
    this.newExperimentForm.controls['experimentName'].disable();
    this.newExperimentForm.controls['measurements'].disable();
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

  deleteItem(index) {
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
        const { message } = err.error;

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen hozzáadás',
          detail: (message === 'ER_DUP_ENTRY')
            ? 'A kísérlet azonosítóval már létezik egy kísérlet.'
            : 'A kísérlet hozzáadása nem sikerült.'
        });
      });
  }

  editExperiment() {
    const experiment = this.newExperimentForm.value;
    this.experimentService.editExperiment(experiment)
      .then(res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A kísérlet módosításra került.'
        });
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A kísérlet módosítása nem sikerült.'
        });
      });
  }
}
