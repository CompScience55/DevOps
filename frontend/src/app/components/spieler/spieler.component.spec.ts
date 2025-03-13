import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpielerComponent } from './spieler.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Spieler, SpielerService } from '../../service/spieler.service';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpielerCardComponent } from '../spieler-card/spieler-card.component';
import { SpielerDialogComponent } from '../spieler-dialog/spieler-dialog.component';
import { of } from 'rxjs';
import { EditSpielerDialogComponent } from '../edit-spieler-dialog/edit-spieler-dialog.component';

describe('SpielerComponent', () => {
  let component: SpielerComponent;
  let fixture: ComponentFixture<SpielerComponent>;
  let spielerService: jasmine.SpyObj<SpielerService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const spielerServiceSpy = jasmine.createSpyObj('SpielerService', ['getSpieler', 'updateSpieler', 'deleteSpieler', 'createSpieler']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        SpielerComponent,
        NoopAnimationsModule,
        SpielerCardComponent
      ],
      providers: [   
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SpielerService, useValue: spielerServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpielerComponent);
    component = fixture.componentInstance;
    spielerService = TestBed.inject(SpielerService) as jasmine.SpyObj<SpielerService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load players on initialization', () => {
    const mockSpieler: Spieler[] = [
      { id: 1, name: 'Max Mustermann', geburtsjahr: 1990, stadt: 'Musterstadt', land: 'Musterland' }
    ];
    spielerService.getSpieler.and.returnValue(of(mockSpieler));

    fixture.detectChanges();

    expect(component.spielerListe).toEqual(mockSpieler);
    expect(spielerService.getSpieler).toHaveBeenCalled();
  });

  it('should open edit dialog and update player on save', () => {
    const mockSpieler: Spieler = { id: 1, name: 'Max Mustermann', geburtsjahr: 1990, stadt: 'Musterstadt', land: 'Musterland' };
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(mockSpieler));
    dialog.open.and.returnValue(dialogRefSpy);
  
    // updateSpieler gibt ein Observable zurück:
    spielerService.updateSpieler.and.returnValue(of(mockSpieler));
    // Wichtig: getSpieler muss ebenfalls ein Observable zurückgeben, da loadSpieler() später aufgerufen wird:
    spielerService.getSpieler.and.returnValue(of([]));
  
    component.onEdit(mockSpieler);
  
    expect(dialog.open).toHaveBeenCalledWith(EditSpielerDialogComponent, {
      width: '400px',
      maxHeight: '80vh',
      data: { id: 1, name: 'Max Mustermann', geburtsjahr: 1990, stadt: 'Musterstadt', land: 'Musterland' },
      panelClass: 'no-scroll-dialog'
    });
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(spielerService.updateSpieler).toHaveBeenCalledWith(mockSpieler.id!, mockSpieler);
  });

  it('should delete player', () => {
    const mockSpieler: Spieler = { id: 1, name: 'Max Mustermann', geburtsjahr: 1990, stadt: 'Musterstadt', land: 'Musterland' };
    component.spielerListe = [mockSpieler];
    spielerService.deleteSpieler.and.returnValue(of(void 0));

    component.onDelete(mockSpieler);

    expect(spielerService.deleteSpieler).toHaveBeenCalledWith(mockSpieler.id!);
    expect(component.spielerListe).not.toContain(mockSpieler);
  });

  it('should open new player dialog and add player on save', () => {
    const mockSpieler: Spieler = { id: 2, name: 'Erika Musterfrau', geburtsjahr: 1985, stadt: 'Beispielstadt', land: 'Beispielland' };
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(mockSpieler));
    dialog.open.and.returnValue(dialogRefSpy);
    spielerService.createSpieler.and.returnValue(of(mockSpieler));

    component.onNewSpieler();

    expect(dialog.open).toHaveBeenCalledWith(SpielerDialogComponent, {
      width: '400px',
      data: {}
    });
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(spielerService.createSpieler).toHaveBeenCalledWith(mockSpieler);
    expect(component.spielerListe).toContain(mockSpieler);
  });
});
