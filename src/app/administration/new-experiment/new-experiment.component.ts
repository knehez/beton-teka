import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent {

  profileForm = this.fb.group({
    newname: ['', Validators.minLength(3)],
    quantity: ['', Validators.required],
    exp: this.fb.array([this.createExpItem()])
  });


  constructor(private fb: FormBuilder) { }

  createExpItem(): FormGroup {
    return this.fb.group({
      name: [''],
      weight: [''],
      id: [''],
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
