import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConcreteService {
    readonly actionUrl = 'backend/concretes';

    constructor(protected _http: HttpClient) {
    }

    async getAllNames() {
        return await this._http.get(`${this.actionUrl}` + '/getAllNames').toPromise();
    }

    saveConcrete(concrete) {
        const id = concrete.id;
        return this._http.put(`${this.actionUrl}/${id}`, concrete).toPromise();
    }

    searchConcretes(label) {
        return this._http.get(this.actionUrl, {
            params: {
                label
            }
        }).toPromise();
    }
}
