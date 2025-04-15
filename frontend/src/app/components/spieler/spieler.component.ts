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
      width: '400px',       // feste Breite
      // height: '400px',    // lieber weglassen
      maxHeight: '80vh',    // nur, wenn du eine maximale Höhe möchtest
      data: spieler,
      panelClass: 'no-scroll-dialog'
    });
    
  
    dialogRef.afterClosed().subscribe((result: Spieler | undefined) => {
      if (result) {
        // Aufruf des Services, um den Spieler zu aktualisieren
        this.spielerService.updateSpieler(result.id!, result).subscribe({
          next: (updatedSpieler) => {
            console.log('Spieler erfolgreich aktualisiert:', updatedSpieler);
            // Optional: Liste neu laden, um die UI zu aktualisieren
            this.loadSpieler();
          },
          error: (err) => console.error('Fehler beim Aktualisieren des Spielers:', err)
        });
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
      data: {}  // Falls Standardwerte gesetzen werden sollen 
    });

    dialogRef.afterClosed().subscribe((result: Spieler) => {
      if (result) {
        // Speichern neuer Spieler
        this.spielerService.createSpieler(result).subscribe(newSpieler => {
          // Neuen Spieler der Liste hinzufügen oder die Liste neuladen 
          this.spielerListe.push(newSpieler);
        });
      }
    });
  }
}
