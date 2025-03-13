import { TestBed } from '@angular/core/testing';

import { SpielerService } from './spieler.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SpielerService', () => {
  let service: SpielerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting()
      ]      
    });
    service = TestBed.inject(SpielerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
