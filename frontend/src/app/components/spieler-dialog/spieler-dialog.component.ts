import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Spieler } from '../../service/spieler.service';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-spieler-dialog',
  templateUrl: './spieler-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class SpielerDialogComponent {
  spielerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SpielerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Spieler,
    private fb: FormBuilder
  ) {
    // Initialisiere das Formular
    this.spielerForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      geburtsjahr: [data?.geburtsjahr || '', Validators.required],
      stadt: [data?.stadt || '', Validators.required],
      land: [data?.land || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.spielerForm.valid) {
      // Gibt das ausgefüllte Formular zurück
      this.dialogRef.close(this.spielerForm.value);
    }
  }
}
