// src/app/components/spieler-cards.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpielerCardComponent } from '../spieler-card/spieler-card.component';
import { Spieler, SpielerService } from '../../service/spieler.service';

@Component({
  selector: 'app-spieler-cards',
  standalone: true,
  imports: [CommonModule, SpielerCardComponent],
  templateUrl: "./spieler.component.html",
  styleUrls: ["./spieler.component.css"]
})
export class SpielerComponent implements OnInit {
  spielerListe: Spieler[] = [];

  constructor(private spielerService: SpielerService) {}

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
    // Hier kannst du z. B. zu einem Bearbeitungsformular navigieren oder einen Modal öffnen.
    console.log('Spieler bearbeiten:', spieler);
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
    // Hier wird z. B. ein Formular oder ein Modal geöffnet, um einen neuen Spieler anzulegen.
    console.log('Neuen Spieler anlegen');
  }
}
