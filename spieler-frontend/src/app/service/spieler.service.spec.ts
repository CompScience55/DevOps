import { TestBed } from '@angular/core/testing';

import { SpielerService } from './spieler.service';

describe('SpielerService', () => {
  let service: SpielerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpielerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
