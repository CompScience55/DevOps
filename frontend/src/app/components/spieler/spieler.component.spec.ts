import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerComponent } from './spieler.component';

describe('SpielerComponent', () => {
  let component: SpielerComponent;
  let fixture: ComponentFixture<SpielerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
