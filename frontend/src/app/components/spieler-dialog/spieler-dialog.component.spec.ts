import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerDialogComponent } from './spieler-dialog.component';

describe('SpielerDialogComponent', () => {
  let component: SpielerDialogComponent;
  let fixture: ComponentFixture<SpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
