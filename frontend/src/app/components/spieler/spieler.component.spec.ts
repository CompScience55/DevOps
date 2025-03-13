import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerComponent } from './spieler.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SpielerComponent', () => {
  let component: SpielerComponent;
  let fixture: ComponentFixture<SpielerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerComponent],
      providers: [   
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
