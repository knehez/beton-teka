import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasurementFileService {

  private actionUrl = 'backend/measurements';

  constructor(public http: HttpClient) { }

  private fileToBase64(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = function (event) {
        resolve(event.target['result']);
      };

      reader.readAsDataURL(file);
    });
  }

  saveFile(measurementId, file: File) {

    return this.fileToBase64(file).then((base64EncodedFile) => {
      const fileToSave = {
        name: file.name,
        lastModifiedDate: new Date(file.lastModified),
        size: file.size,
        type: file.type,
        data: base64EncodedFile
      };

      return this.http.post(`${this.actionUrl}/${measurementId}/files`, fileToSave).toPromise();
    });
  }
}
