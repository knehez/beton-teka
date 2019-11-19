import { TestBed } from '@angular/core/testing';

import { MeasurementFileService } from './measurement-file.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MeasurementFileService', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: MeasurementFileService = TestBed.get(MeasurementFileService);
    expect(service).toBeTruthy();
  });
});
