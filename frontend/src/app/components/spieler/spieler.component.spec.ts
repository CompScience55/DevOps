import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerComponent } from './spieler.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SpielerComponent', () => {
  let component: SpielerComponent;
  let fixture: ComponentFixture<SpielerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerComponent],
      providers: [   
        provideHttpClient(),
        provideHttpClientTesting() 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
