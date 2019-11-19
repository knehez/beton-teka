import { TestBed } from '@angular/core/testing';

import { MeasurementTypeService } from './measurement-type.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('MeasurementTypeService', () => {
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
    const service: MeasurementTypeService = TestBed.get(MeasurementTypeService);
    expect(service).toBeTruthy();
  });
});
