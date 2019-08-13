import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MeasurementService } from 'src/app/_services/measurement.service';
import { MessageService } from 'primeng/api';
import { MeasurementFileService } from 'src/app/_services/measurement-file.service';

@Component({
  selector: 'app-new-measurement',
  templateUrl: './new-measurement.component.html',
  styleUrls: ['./new-measurement.component.css']
})
export class NewMeasurementComponent implements OnInit {

  measurementColumns: any[];
  searchedExperimentName: string;
  experiment: any;
  fileUploadInProgress = false;

  measurementTypes = [];
  filteredMeasurementTypes = [];
  tabs = [];

  allowedFileSize = 15000000;
  @ViewChild('fileUpload') fileUpload: any;

  measurementForm = this.formBuilder.group({
    selectedMeasurementType: [{
      measurementData: {
        data: []
      }
    }],
    newMeasurementData: this.createMeasurementData(),
    file: [[]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private experimentService: ExperimentService,
    private measurementService: MeasurementService,
    private measurementFileService: MeasurementFileService
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

  putMeasurementsToFormControl(measurements) {
    for (const measurement of measurements) {
      this.measurementTypes.push({
        label: `${this.experiment['id']}-${measurement.group} - ${measurement.measurementType.name}`,
        value: measurement
      });
    }
  }

  createTabMenus(measurements) {
    const registeredGroupIds = [];

    for (const measurement of measurements) {
      const groupId = measurement.group;

      if (!registeredGroupIds.includes(groupId)) {
        registeredGroupIds.push(groupId);

        this.tabs.push({
          label: `${this.experiment['experimentName']}-${groupId}`,
          data: groupId
        });
      }
    }
  }

  searchExperiment() {
    this.measurementTypes = [];
    this.filteredMeasurementTypes = [];
    this.tabs = [];

    this.experimentService.searchExperimentById(this.searchedExperimentName)
      .then(res => {
        this.experiment = res['data'];
        const measurements = this.experiment.measurements;

        if (!measurements || !Array.isArray(measurements) || measurements.length === 0) {
          return this.messageService.add({
            severity: 'warn',
            summary: 'Hiba',
            detail: 'A kísérlethez nem tartozik mérés.'
          });
        }

        this.putMeasurementsToFormControl(measurements);
        this.createTabMenus(measurements);

        this.measurementForm.get('selectedMeasurementType').setValue(this.measurementTypes[0].value);
        this.filterMeasurements(this.measurementTypes[0].value.group);
      })
      .catch(err => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Azonosító hiba',
            detail: 'A megadott azonosítóval nem létezik kísérlet.'
          });
        }
      });
  }

  addMeasurementData() {
    const data = this.measurementForm.get('newMeasurementData').value;

    this.selectedMeasurementType.measurementData.data.push(data);
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
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A mérés módosítása nem sikerült.'
        });
      });
  }

  deleteRow(index) {
    this.selectedMeasurementType.measurementData.data.splice(index, 1);
    this.saveMeasurement();
  }

  setSelectedMeasurementToDefault() {
    this.measurementForm.get('selectedMeasurementType').setValue(this.filteredMeasurementTypes[0].value);
  }

  filterMeasurements(groupId) {
    this.filteredMeasurementTypes = this.measurementTypes.filter(type => type.value.group === groupId);
  }

  switchTab(tabMenu) {
    const groupId = tabMenu.activeItem.data;
    this.filterMeasurements(groupId);
    this.setSelectedMeasurementToDefault();
  }

  createMeasurementGroup() {
    let groupId;

    this.measurementService.createMeasurementGroup(this.experiment.id)
      .then(res => {
        if (!res['success']) {
          return;
        }

        groupId = res['data'].groupId;

        return this.experimentService.searchExperimentById(this.experiment.experimentName);
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen hozzáadás',
          detail: 'A méréscsoport hozzáadása nem sikerült.'
        });
      })
      .then(res => {
        const measurements = res['data'].measurements;
        const newMeasurements = measurements.filter(measurement => measurement.group === groupId);

        this.putMeasurementsToFormControl(newMeasurements);
        this.createTabMenus(newMeasurements);

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres hozzáadás',
          detail: 'A méréscsoport hozzáadásra került.'
        });
      });
  }

  clearAfterFileUpload() {
    this.fileUploadInProgress = false;
    this.fileUpload.clear();
  }

  uploadNewFile(event) {
    if (event.files.length === 0 || event.files.length > 1) {
      this.clearAfterFileUpload();
      return this.messageService.add({
        severity: 'error',
        summary: 'Sikertelen hozzáadás',
        detail: 'Csak egy fájl tölthető fel egyszerre.'
      });
    }

    const file: File = event.files[0];

    if (file.size > this.allowedFileSize) {
      this.clearAfterFileUpload();
      return this.messageService.add({
        severity: 'error',
        summary: 'Sikertelen hozzáadás',
        detail: 'A maximális feltölthető fájlméret 15 MB.'
      });
    }

    this.fileUploadInProgress = true;

    this.measurementFileService.saveFile(this.selectedMeasurementType.id, event.files[0])
      .then(res => {
        this.clearAfterFileUpload();

        this.selectedMeasurementType.files.push(event.files[0]);

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres hozzáadás',
          detail: 'A fájl hozzáadásra került.'
        });
      })
      .catch(err => {
        this.clearAfterFileUpload();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen hozzáadás',
          detail: 'A fájl hozzáadása nem sikerült.'
        });
      });

  }

  deleteFile(index) {
    const fileToDelete = this.selectedMeasurementType.files[index];

    this.measurementFileService.deleteFile(this.selectedMeasurementType.id, fileToDelete.id)
      .then(res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres törlés',
          detail: 'A fájl törlésre került.'
        });

        this.selectedMeasurementType.files.splice(index, 1);
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen törlés',
          detail: 'A fájl törlése nem sikerült.'
        });
      });
  }

  downloadFile(index) {
    const fileToDownload = this.selectedMeasurementType.files[index];

    this.measurementFileService.downloadFile(this.selectedMeasurementType.id, fileToDownload.id)
      .then(res => {
        const file = res['data'];

        const downloadLink = document.createElement('a');
        downloadLink.href = file.data;
        downloadLink.download = file.name;
        downloadLink.setAttribute('type', 'hidden');
        document.body.appendChild(downloadLink);


        downloadLink.click();
        downloadLink.remove();
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen letöltés',
          detail: 'A fájl letöltése nem sikerült.'
        });
      });

  }
}
