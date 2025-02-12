import { Component } from '@angular/core';
import { SpielerCardsComponent } from './component/spieler-cards/spieler-cards.component';

@Component({
  selector: 'app-root',
  imports: [SpielerCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spieler-frontend';
}
