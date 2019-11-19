import { TestBed } from '@angular/core/testing';

import { MeasurementService } from './measurement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('MeasurementService', () => {
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    httpClient = TestBed.get(HttpClient);
    const service: MeasurementService = TestBed.get(MeasurementService);
    expect(service).toBeTruthy();
  });
});
