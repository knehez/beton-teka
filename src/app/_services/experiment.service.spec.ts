import { TestBed } from '@angular/core/testing';

import { ExperimentService } from './experiment.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExperimentService', () => {
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    httpClient = TestBed.get(HttpClient);
    const service: ExperimentService = TestBed.get(ExperimentService);
    expect(service).toBeTruthy();
  });
});
