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
  showDensity = false;
  showStrength = false;
  showStrength2 = false;

  profileForm = this.fb.group({
    mes: this.fb.array([this.createMesItem()])
  });

  constructor(private fb: FormBuilder) { }

  createMesItem(): FormGroup {
    return this.fb.group({
      serial: [''],
      id: [''],
      weight: [''],
      surface1: [''],
      surface2: [''],
      height: [''],
      density: [''],
      force: [''],
      strength: [''],
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

  densityClick() {
    this.showDensity = true;
    this.showStrength = false;
    this.showStrength2 = false;
  }

  strengthClick() {
    this.showStrength = true;
    this.showDensity = false;
    this.showStrength2 = false;
  }

  strength2Click() {
    this.showStrength2 = true;
    this.showDensity = false;
    this.showStrength = false;
  }

}
