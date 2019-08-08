import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  private actionUrl = 'backend/experiments';


  constructor(protected _http: HttpClient) { }

  saveExperiment(experiment) {
    return this._http.post(`${this.actionUrl}`, experiment).toPromise();
  }

  searchExperimentById (id) {
    return this._http.get(`${this.actionUrl}/${id}`).toPromise();
  }

  searchExperiment(experimentName) {
    return this._http.get(this.actionUrl, {
      params: {
        experimentName
      }
    }).toPromise();
  }
}
