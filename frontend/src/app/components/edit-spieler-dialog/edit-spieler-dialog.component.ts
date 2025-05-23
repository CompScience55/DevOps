import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Spieler } from '../../service/spieler.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-spieler-dialog',
  templateUrl: './edit-spieler-dialog.component.html',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  standalone: true
})
export class EditSpielerDialogComponent implements OnInit {
  editSpielerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSpielerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Spieler,
    private fb: FormBuilder
  ) {
    // Formular mit den bestehenden Spieler-Daten vorinitialisieren
    this.editSpielerForm = this.fb.group({
      name: [data.name, Validators.required],
      geburtsjahr: [data.geburtsjahr, Validators.required],
      stadt: [data.stadt, Validators.required],
      land: [data.land, Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editSpielerForm.valid) {
      // Kombiniert die ursprünglichen Daten mit den neuen Werten
      const updatedSpieler = { ...this.data, ...this.editSpielerForm.value };
      this.dialogRef.close(updatedSpieler);
    }
  }
}
