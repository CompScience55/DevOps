package com.CompScience55.DevOps.controller;
import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.service.SpielerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spieler")
public class SpielerController {

    private final SpielerService spielerService;

    public SpielerController(SpielerService spielerService) {
        this.spielerService = spielerService;
    }

    // Alle Spieler abrufen
    @GetMapping("/getAll")
    public List<Spieler> getAllSpieler() {
        return spielerService.getAllSpieler();
    }

    // Spieler anhand der ID abrufen
    @GetMapping("/get/{id}")
    public ResponseEntity<Spieler> getSpielerById(@PathVariable Long id) {
        return spielerService.getSpielerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Neuen Spieler erstellen
    @PostMapping("/create")
    public Spieler createSpieler(@RequestBody Spieler spieler) {
        return spielerService.createSpieler(spieler);
    }

    // Spieler aktualisieren
    @PutMapping("/update/{id}")
    public ResponseEntity<Spieler> updateSpieler(@PathVariable Long id, @RequestBody Spieler spieler) {
        return spielerService.updateSpieler(id, spieler)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Spieler löschen
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSpieler(@PathVariable Long id) {
        boolean deleted = spielerService.deleteSpieler(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
