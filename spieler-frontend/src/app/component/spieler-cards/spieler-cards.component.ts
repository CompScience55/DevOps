// src/app/components/spieler-cards/spieler-cards.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';    // für *ngFor, *ngIf usw.
import { FormsModule } from '@angular/forms';        // für [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // falls weitere HTTP-Features benötigt werden
import { Spieler, SpielerService } from 'app/service/spieler.service';

@Component({
  selector: 'app-spieler-cards',
  standalone: true,
  // Inline-Template (alternativ: templateUrl verwenden)
  template: `
    <div class="container">
      <h2>Neuen Spieler anlegen</h2>
      <div class="new-spieler-form">
        <input type="text" placeholder="Name" [(ngModel)]="newSpieler.name" />
        <input type="number" placeholder="Geburtsjahr" [(ngModel)]="newSpieler.geburtsjahr" />
        <input type="text" placeholder="Stadt" [(ngModel)]="newSpieler.stadt" />
        <input type="text" placeholder="Land" [(ngModel)]="newSpieler.land" />
        <button (click)="addSpieler()">Anlegen</button>
      </div>

      <h2>Spieler Liste</h2>
      <div class="karten-container">
        <div class="karte" *ngFor="let spieler of spielerListe">
          <div *ngIf="editingSpielerId === spieler.id; else viewMode">
            <!-- Bearbeitungsmodus -->
            <input type="text" [(ngModel)]="editingSpieler.name" placeholder="Name" />
            <input type="number" [(ngModel)]="editingSpieler.geburtsjahr" placeholder="Geburtsjahr" />
            <input type="text" [(ngModel)]="editingSpieler.stadt" placeholder="Stadt" />
            <input type="text" [(ngModel)]="editingSpieler.land" placeholder="Land" />
            <button (click)="saveEdit()">Speichern</button>
            <button (click)="cancelEdit()">Abbrechen</button>
          </div>
          <ng-template #viewMode>
            <!-- Anzeige-Modus -->
            <h3>{{ spieler.name }}</h3>
            <p>Geburtsjahr: {{ spieler.geburtsjahr }}</p>
            <p>Stadt: {{ spieler.stadt }}</p>
            <p>Land: {{ spieler.land }}</p>
            <button (click)="startEdit(spieler)">Bearbeiten</button>
            <button (click)="deleteSpieler(spieler.id)">Löschen</button>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  // Inline-Styles (alternativ: styleUrls verwenden)
  styles: [`
    .container {
      max-width: 800px;
      margin: auto;
      padding: 1rem;
    }
    .new-spieler-form input {
      margin-right: 0.5rem;
      padding: 0.3rem;
    }
    .karten-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .karte {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1rem;
      width: 250px;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    }
    .karte h3 {
      margin-top: 0;
    }
    .karte button {
      margin-right: 0.5rem;
      margin-top: 0.5rem;
    }
  `],
  // Importiere die benötigten Angular-Module direkt in der Komponente
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SpielerCardsComponent implements OnInit {
  spielerListe: Spieler[] = [];

  // Variablen für das Anlegen eines neuen Spielers
  newSpieler: Spieler = { name: '', geburtsjahr: new Date().getFullYear(), stadt: '', land: '' };

  // Variablen für den Bearbeitungsmodus
  editingSpielerId: number | null = null;
  editingSpieler: Spieler = { name: '', geburtsjahr: new Date().getFullYear(), stadt: '', land: '' };

  constructor(private spielerService: SpielerService) {}

  ngOnInit(): void {
    this.loadSpieler();
  }

  // Lädt alle Spieler vom Backend
  loadSpieler(): void {
    this.spielerService.getSpieler().subscribe({
      next: (data: Spieler[]) => this.spielerListe = data,
      error: (err: any) => console.error('Fehler beim Laden der Spieler', err)
    });
  }

  // Neuen Spieler anlegen
  addSpieler(): void {
    if (!this.newSpieler.name.trim()) { return; }
    this.spielerService.createSpieler(this.newSpieler).subscribe({
      next: (spieler: any) => {
        this.spielerListe.push(spieler);
        // Formular zurücksetzen
        this.newSpieler = { name: '', geburtsjahr: new Date().getFullYear(), stadt: '', land: '' };
      },
      error: (err: any) => console.error('Fehler beim Anlegen des Spielers', err)
    });
  }

  // Bearbeitungsmodus starten
  startEdit(spieler: Spieler): void {
    this.editingSpielerId = spieler.id || null;
    this.editingSpieler = { ...spieler };
  }

  // Bearbeitung abbrechen
  cancelEdit(): void {
    this.editingSpielerId = null;
  }

  // Bearbeitung speichern
  saveEdit(): void {
    if (this.editingSpielerId == null) { return; }
    this.spielerService.updateSpieler(this.editingSpielerId, this.editingSpieler).subscribe({
      next: (updatedSpieler: any) => {
        const index = this.spielerListe.findIndex(s => s.id === this.editingSpielerId);
        if (index !== -1) {
          this.spielerListe[index] = updatedSpieler;
        }
        this.editingSpielerId = null;
      },
      error: (err: any) => console.error('Fehler beim Aktualisieren des Spielers', err)
    });
  }

  // Spieler löschen
  deleteSpieler(id: number | undefined): void {
    if (id == null) { return; }
    this.spielerService.deleteSpieler(id).subscribe({
      next: () => {
        this.spielerListe = this.spielerListe.filter(s => s.id !== id);
      },
      error: (err: any) => console.error('Fehler beim Löschen des Spielers', err)
    });
  }
}
