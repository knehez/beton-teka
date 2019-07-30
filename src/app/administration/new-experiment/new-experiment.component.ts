import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MeasurementTypeService } from 'src/app/_services/measurement-type.service';


@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {
  types;

  profileForm = this.fb.group({
    newname: ['', Validators.minLength(3)],
    cups: ['', Validators.required],
    exp: this.fb.array([this.createExpItem()]),
    date: [new Date()],
    desription: [''],
    measurementTypes: []
  });


  constructor(
    private fb: FormBuilder,
    private measurementTypeService: MeasurementTypeService
  ) { }

  ngOnInit() {
    this.measurementTypeService.getTypes().then(res => {

      const types = [];

      for (const i in res) {
        if (1 > 0) {
          types.push({
            label: res[i].name,
            value: res[i]
          });
        }
      }

      this.types = types;
    });
  }

  createExpItem(): FormGroup {
    return this.fb.group({
      name: [''],
      quantity: [''],
      unit: [''],
    });
  }

  get exp() {
    return this.profileForm.get('exp') as FormArray;
  }

  addItem() {
    this.exp.push(this.createExpItem());
  }

  onItemDeleted(index) {
    this.exp.removeAt(index);
  }
}
