import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpielerDialogComponent } from './edit-spieler-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

describe('EditSpielerDialogComponent', () => {
  let component: EditSpielerDialogComponent;
  let fixture: ComponentFixture<EditSpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpielerDialogComponent, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        provideHttpClientTesting() 
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
