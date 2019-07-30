import { TestBed } from '@angular/core/testing';

import { MeasurementTypeService } from './measurement-type.service';

describe('MeasurementTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasurementTypeService = TestBed.get(MeasurementTypeService);
    expect(service).toBeTruthy();
  });
});
