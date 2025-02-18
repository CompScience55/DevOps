package com.CompScience55.DevOps.controller;
import com.CompScience55.DevOps.dto.SpielerDTO;
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
    public List<SpielerDTO> getAllSpieler() {
        return spielerService.getAllSpieler();
    }

    // Spieler anhand der ID abrufen
    @GetMapping("/get/{id}")
    public ResponseEntity<SpielerDTO> getSpielerById(@PathVariable Long id) {
        return ResponseEntity.ok(spielerService.getSpielerById(id));
    }

    // Neuen Spieler erstellen
    @PostMapping("/create")
    public SpielerDTO createSpieler(@RequestBody SpielerDTO spieler) {
        return spielerService.createSpieler(spieler);
    }

    // Spieler aktualisieren
    @PutMapping("/update/{id}")
    public ResponseEntity<SpielerDTO> updateSpieler(@PathVariable Long id, @RequestBody SpielerDTO spieler) {
        return ResponseEntity.ok(spielerService.updateSpieler(id, spieler));
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
