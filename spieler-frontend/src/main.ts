// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { SpielerCardsComponent } from 'app/component/spieler-cards/spieler-cards.component';

bootstrapApplication(SpielerCardsComponent, {
  providers: [
    provideHttpClient()
    // weitere globale Provider, falls notwendig
  ]
}).catch(err => console.error(err));
