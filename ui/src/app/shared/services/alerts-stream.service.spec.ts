import { TestBed } from '@angular/core/testing';

import { AlertsStreamService } from './alerts-stream.service';

describe('AlertsStreamService', () => {
  let service: AlertsStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
