// src/app/components/spieler-cards.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpielerCardComponent } from '../spieler-card/spieler-card.component';
import { Spieler, SpielerService } from '../../service/spieler.service';
import { MatDialog } from '@angular/material/dialog';
import { SpielerDialogComponent } from '../spieler-dialog/spieler-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EditSpielerDialogComponent } from '../edit-spieler-dialog/edit-spieler-dialog.component';

@Component({
  selector: 'app-spieler-cards',
  standalone: true,
  imports: [CommonModule, SpielerCardComponent, MatButtonModule, MatCardModule],
  templateUrl: "./spieler.component.html",
  styleUrls: ["./spieler.component.css"]
})
export class SpielerComponent implements OnInit {
  spielerListe: Spieler[] = [];
  
  constructor(private spielerService: SpielerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSpieler();
  }

  loadSpieler(): void {
    this.spielerService.getSpieler().subscribe({
      next: (data: Spieler[]) => this.spielerListe = data,
      error: (err) => console.error('Fehler beim Laden der Spieler:', err)
    });
  }

  onEdit(spieler: Spieler): void {
    const dialogRef = this.dialog.open(EditSpielerDialogComponent, {
      width: '400px',
      height: '400px',
      data: spieler
    });
  
    dialogRef.afterClosed().subscribe((result: Spieler | undefined) => {
      if (result) {
        // Hier kannst du z. B. den Service aufrufen, um den Spieler zu aktualisieren
        console.log('Aktualisierter Spieler:', result);
      }
    });
  }

  onDelete(spieler: Spieler): void {
    // Beispiel: Aufruf des Services zum Löschen und Aktualisieren der Liste
    this.spielerService.deleteSpieler(spieler.id!).subscribe({
      next: () => {
        this.spielerListe = this.spielerListe.filter(s => s.id !== spieler.id);
        console.log('Spieler gelöscht:', spieler);
      },
      error: (err) => console.error('Fehler beim Löschen des Spielers:', err)
    });
  }

  onNewSpieler(): void {
    const dialogRef = this.dialog.open(SpielerDialogComponent, {
      width: '400px',
      data: {}  // Falls du Standardwerte setzen möchtest
    });

    dialogRef.afterClosed().subscribe((result: Spieler) => {
      if (result) {
        // Verwende deinen Service, um den neuen Spieler zu speichern
        this.spielerService.createSpieler(result).subscribe(newSpieler => {
          // Füge den neuen Spieler der Liste hinzu oder lade die Liste neu
          this.spielerListe.push(newSpieler);
        });
      }
    });
  }
}
