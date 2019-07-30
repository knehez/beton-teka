import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MeasurementTypeService {
  private actionUrl = 'backend/';

  constructor(protected _http: HttpClient) {
  }

  getTypes() {
    return this._http.get(`${this.actionUrl}measurementTypes`).toPromise();
  }

}
