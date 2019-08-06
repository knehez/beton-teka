import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private actionUrl = 'backend/measurements';

  constructor(
    private http: HttpClient
  ) { }

  saveMeasurement(measurement) {
    const id = measurement.id;
    return this.http.put(`${this.actionUrl}/${id}`, measurement).toPromise();
  }

  createMeasurementGroup(experimentId) {
    return this.http.post(`${this.actionUrl}/group`, { experimentId }).toPromise();
  }
}
