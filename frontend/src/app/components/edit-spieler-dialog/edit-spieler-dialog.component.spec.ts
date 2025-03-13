import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpielerDialogComponent } from './edit-spieler-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('EditSpielerDialogComponent', () => {
  let component: EditSpielerDialogComponent;
  let fixture: ComponentFixture<EditSpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpielerDialogComponent, MatDialogModule, CommonModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        provideHttpClientTesting() ,
        provideAnimationsAsync()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpielerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
