// src/app/services/spieler.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Spieler {
  id?: number;         // id ist optional, da sie vom Backend generiert wird
  name: string;
  geburtsjahr: number;
  stadt: string;
  land: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpielerService {
  // Passe die URL an deine Umgebung an (Backend muss laufen!)
  private apiUrl = 'http://localhost:8080/api/spieler';

  constructor(private http: HttpClient) {}

  // Alle Spieler abrufen
  getSpieler(): Observable<Spieler[]> {
    return this.http.get<Spieler[]>(`${this.apiUrl}/getAll`);
  }

  // Neuen Spieler anlegen
  createSpieler(spieler: Spieler): Observable<Spieler> {
    return this.http.post<Spieler>(`${this.apiUrl}/create`, spieler);
  }

  // Einen Spieler aktualisieren
  updateSpieler(id: number, spieler: Spieler): Observable<Spieler> {
    return this.http.put<Spieler>(`${this.apiUrl}/update/${id}`, spieler);
  }

  // Einen Spieler löschen
  deleteSpieler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
