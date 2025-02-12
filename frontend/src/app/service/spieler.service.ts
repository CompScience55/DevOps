import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Spieler {
  id?: number;          
  name: string;
  geburtsjahr: number;
  stadt: string;
  land: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpielerService {

  // Basis-URL zum Backend – hier anpassen, falls notwendig
  private apiUrl = 'http://localhost:8080/api/spieler';

  // HttpClient wird über den Konstruktor injiziert
  constructor(private http: HttpClient) {}

  // Methode, um alle Spieler abzurufen
  getSpieler(): Observable<Spieler[]> {
    return this.http.get<Spieler[]>(`${this.apiUrl}/getAll`);
  }

  // Methode, um einen neuen Spieler anzulegen
  createSpieler(spieler: Spieler): Observable<Spieler> {
    return this.http.post<Spieler>(`${this.apiUrl}/create`, spieler);
  }

  // Methode, um einen bestehenden Spieler zu aktualisieren
  updateSpieler(id: number, spieler: Spieler): Observable<Spieler> {
    return this.http.put<Spieler>(`${this.apiUrl}/update/${id}`, spieler);
  }

  // Methode, um einen Spieler zu löschen
  deleteSpieler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
