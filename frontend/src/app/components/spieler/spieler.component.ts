import { Component, OnInit } from '@angular/core';
import { Spieler, SpielerService } from '../../service/spieler.service';

@Component({
  selector: 'app-spieler',
  imports: [],
  templateUrl: './spieler.component.html',
  styleUrl: './spieler.component.css'
})
export class SpielerComponent implements OnInit{
  protected spieler: Spieler[] = [];

  constructor(private spielerService: SpielerService) {}

  ngOnInit() {
    this.spielerService.getSpieler().subscribe({
      next: (data: Spieler[]) => {
        this.spieler = data;
        console.log('Spieler geladen:', data);
      },
      error: (err) => {
        console.error('Fehler beim Laden der Spieler:', err);
      },
      complete: () => {
        console.log('Datenladen abgeschlossen.');
      }
    });
    console.log(this.spieler);
  }
}
