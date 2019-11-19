import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementTypeService {
  private actionUrl = 'backend/';

  constructor(protected _http: HttpClient) {
  }

  getTypes() {
    return this._http.get(`${this.actionUrl}measurementTypes`).toPromise();
  }

}
