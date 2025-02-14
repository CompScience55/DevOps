import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpielerDialogComponent } from './edit-spieler-dialog.component';

describe('EditSpielerDialogComponent', () => {
  let component: EditSpielerDialogComponent;
  let fixture: ComponentFixture<EditSpielerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpielerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpielerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
