import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerDialogComponent } from './spieler-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SpielerDialogComponent', () => {
  let component: SpielerDialogComponent;
  let fixture: ComponentFixture<SpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerDialogComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        provideHttpClientTesting(),
        provideAnimationsAsync()
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
