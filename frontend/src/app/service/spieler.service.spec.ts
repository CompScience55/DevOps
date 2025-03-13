import { TestBed } from '@angular/core/testing';

import { SpielerService } from './spieler.service';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SpielerService', () => {
  let service: SpielerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]      
    });
    service = TestBed.inject(SpielerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
