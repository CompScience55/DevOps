import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpielerCardComponent } from './spieler-card.component';
import { Spieler } from '../../service/spieler.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('SpielerCardComponent', () => {
  let component: SpielerCardComponent;
  let fixture: ComponentFixture<SpielerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, SpielerCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpielerCardComponent);
    component = fixture.componentInstance;
    component.spieler = { 
      name: 'Max Mustermann',
      geburtsjahr: 1990,
      stadt: 'Musterstadt', 
      land: 'Musterland' 
    } as Spieler;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
