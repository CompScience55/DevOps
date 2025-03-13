import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerDialogComponent } from './spieler-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SpielerDialogComponent', () => {
  let component: SpielerDialogComponent;
  let fixture: ComponentFixture<SpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerDialogComponent, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        provideHttpClientTesting() 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
