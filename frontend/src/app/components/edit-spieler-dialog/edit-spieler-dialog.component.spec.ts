import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpielerDialogComponent } from './edit-spieler-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('EditSpielerDialogComponent', () => {
  let component: EditSpielerDialogComponent;
  let fixture: ComponentFixture<EditSpielerDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditSpielerDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [EditSpielerDialogComponent, MatDialogModule, CommonModule],
      providers: [
        { provide: MAT_DIALOG_DATA, 
          useValue: { name: 'Max Mustermann', geburtsjahr: 1990, stadt: 'Musterstadt', land: 'Musterland' } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
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

  it('should initialize the form with provided data', () => {
    expect(component.editSpielerForm.value).toEqual({
      name: 'Max Mustermann',
      geburtsjahr: 1990,
      stadt: 'Musterstadt',
      land: 'Musterland'
    });
  });

  it('should close the dialog with updated data when onSave is called and form is valid', () => {
    component.editSpielerForm.setValue({
      name: 'Erika Musterfrau',
      geburtsjahr: 1985,
      stadt: 'Beispielstadt',
      land: 'Beispielland'
    });

    component.onSave();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'Erika Musterfrau',
      geburtsjahr: 1985,
      stadt: 'Beispielstadt',
      land: 'Beispielland'
    });
  });

  it('should not close the dialog when onSave is called and form is invalid', () => {
    component.editSpielerForm.setValue({
      name: '',
      geburtsjahr: 1985,
      stadt: 'Beispielstadt',
      land: 'Beispielland'
    });

    component.onSave();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();

    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
