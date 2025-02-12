// src/app/components/spieler-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Spieler } from '../../service/spieler.service';

@Component({
  selector: 'app-spieler-card',
  standalone: true,
  // Wichtig: CommonModule wird hier nicht zwingend benötigt, da wir in dieser Komponente keine strukturellen Direktiven verwenden.
  templateUrl: "./spieler-card.component.html",
  styleUrls: ["./spieler-card.component.css"]
})
export class SpielerCardComponent {
  @Input() spieler!: Spieler;
  // Um Namenskonflikte mit nativen DOM-Events (z. B. "delete") zu vermeiden, haben wir die Outputs umbenannt:
  @Output() editSpieler = new EventEmitter<Spieler>();
  @Output() deleteSpieler = new EventEmitter<Spieler>();

  onEdit(): void {
    this.editSpieler.emit(this.spieler);
  }

  onDelete(): void {
    this.deleteSpieler.emit(this.spieler);
  }
}
