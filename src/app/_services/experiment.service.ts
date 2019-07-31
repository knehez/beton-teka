import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  private actionUrl = 'backend/';


  constructor(protected _http: HttpClient) { }

  saveExperiment(experiment) {
    return this._http.post(`${this.actionUrl}experiments`, experiment).toPromise();
  }
}
