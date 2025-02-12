package com.CompScience55.DevOps.service;

import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.repository.SpielerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpielerService {

    private final SpielerRepository spielerRepository;

    public SpielerService(SpielerRepository spielerRepository) {
        this.spielerRepository = spielerRepository;
    }

    // Alle Spieler abrufen
    public List<Spieler> getAllSpieler() {
        return spielerRepository.findAll();
    }

    // Spieler anhand der ID abrufen
    public Optional<Spieler> getSpielerById(Long id) {
        return spielerRepository.findById(id);
    }

    // Neuen Spieler erstellen
    public Spieler createSpieler(Spieler spieler) {
        return spielerRepository.save(spieler);
    }

    // Spieler aktualisieren
    public Optional<Spieler> updateSpieler(Long id, Spieler updatedSpieler) {
        return spielerRepository.findById(id)
                .map(existingSpieler -> {
                    existingSpieler.setName(updatedSpieler.getName());
                    existingSpieler.setGeburtsjahr(updatedSpieler.getGeburtsjahr());
                    existingSpieler.setStadt(updatedSpieler.getStadt());
                    existingSpieler.setLand(updatedSpieler.getLand());
                    return spielerRepository.save(existingSpieler);
                });
    }

    // Spieler löschen
    public boolean deleteSpieler(Long id) {
        return spielerRepository.findById(id)
                .map(spieler -> {
                    spielerRepository.delete(spieler);
                    return true;
                })
                .orElse(false);
    }
}
