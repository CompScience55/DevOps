import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Spieler {
  id?: number;
  name: string;
  geburtsjahr: number;
  stadt: string;
  land: string;
}

interface SpielerHateoasResponse {
  _embedded: {
    spielerDTOList: Spieler[];
  };
  _links: any; // Weitere Links, falls benötigt
}

@Injectable({
  providedIn: 'root'
})
export class SpielerService {

  // Basis-URL zum Backend – hier anpassen, falls notwendig
  private apiUrl = 'http://localhost:8080/api/spieler';

  constructor(private http: HttpClient) {}

  // Methode, um alle Spieler abzurufen, angepasst an die HATEOAS-Struktur
  getSpieler(): Observable<Spieler[]> {
    return this.http.get<any>(`${this.apiUrl}/getAll`)
      .pipe(
        map(response => {
          if (response._embedded && response._embedded.spielerDTOList) {
            return response._embedded.spielerDTOList;
          } else {
            return [];
          }
        })
      );
  }

  // Weitere Methoden können ähnlich angepasst werden, falls sie von HATEOAS-Struktur betroffen sind
  createSpieler(spieler: Spieler): Observable<Spieler> {
    return this.http.post<Spieler>(`${this.apiUrl}/create`, spieler);
  }

  updateSpieler(id: number, spieler: Spieler): Observable<Spieler> {
    return this.http.put<Spieler>(`${this.apiUrl}/update/${id}`, spieler);
  }

  deleteSpieler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
