import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-measurement',
  templateUrl: './new-measurement.component.html',
  styleUrls: ['./new-measurement.component.css']
})
export class NewMeasurementComponent implements OnInit {

  showResult = false;

  profileForm = this.fb.group({
    mes: this.fb.array([this.createMesItem()])
  });

  constructor(private fb: FormBuilder) { }

  createMesItem(): FormGroup {
    return this.fb.group({
      name: [''],
      value: [''],
      unit: [''],
      note: [''],
    });
  }

  get mes() {
    return this.profileForm.get('mes') as FormArray;
  }

  addItem() {
    this.mes.push(this.createMesItem());
  }

  onItemDeleted(index) {
    this.mes.removeAt(index);
  }

  ngOnInit() {
  }

  searchClick() {
    this.showResult = true;
  }

}
