import { TestBed } from '@angular/core/testing';

import { MeasurementFileService } from './measurement-file.service';

describe('MeasurementFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasurementFileService = TestBed.get(MeasurementFileService);
    expect(service).toBeTruthy();
  });
});
