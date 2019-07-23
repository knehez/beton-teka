import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConcreteService {
    private actionUrl = 'backend/';

    constructor(protected _http: HttpClient) {
    }

    async getAllNames() {
        return await this._http.get(`${this.actionUrl}concrete/getAllNames`).toPromise();
    }

    async getAllData() {
        return await this._http.get(`${this.actionUrl}concrete/getAllData`).toPromise();
    }

}
