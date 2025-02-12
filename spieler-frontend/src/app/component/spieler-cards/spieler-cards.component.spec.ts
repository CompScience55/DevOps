import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerCardsComponent } from './spieler-cards.component';

describe('SpielerCardsComponent', () => {
  let component: SpielerCardsComponent;
  let fixture: ComponentFixture<SpielerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
