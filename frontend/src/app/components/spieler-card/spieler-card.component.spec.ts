import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerCardComponent } from './spieler-card.component';

describe('SpielerCardComponent', () => {
  let component: SpielerCardComponent;
  let fixture: ComponentFixture<SpielerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
