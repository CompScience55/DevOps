package com.CompScience55.DevOps.service;

import com.CompScience55.DevOps.dto.SpielerDTO;
import com.CompScience55.DevOps.dto.SpielerMapper;
import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.repository.SpielerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpielerService {

    private final SpielerRepository spielerRepository;

    public SpielerService(SpielerRepository spielerRepository) {
        this.spielerRepository = spielerRepository;
    }

    // Alle Spieler abrufen
    public List<SpielerDTO> getAllSpieler() {
        return spielerRepository.findAll().stream().map(SpielerMapper::fromEntity).collect(Collectors.toList());
    }

    // Spieler anhand der ID abrufen
    public SpielerDTO getSpielerById(Long id) {
        return SpielerMapper.fromEntity(spielerRepository.getReferenceById(id));
    }

    public SpielerDTO updateSpieler(Long id, SpielerDTO updatedSpieler) {
        // Hole die Referenz zum existierenden Spieler
        Spieler spieler = spielerRepository.getReferenceById(id);

        // Aktualisiere die Felder
        spieler.setName(updatedSpieler.getName());
        spieler.setGeburtsjahr(updatedSpieler.getGeburtsjahr());
        spieler.setStadt(updatedSpieler.getStadt());
        spieler.setLand(updatedSpieler.getLand());

        // Speichere den aktualisierten Spieler
        spielerRepository.save(spieler);

        // Wandle den Spieler in ein DTO um und gib es zurück
        return SpielerMapper.fromEntity(spieler);
    }

    // Neuen Spieler erstellen
    public SpielerDTO createSpieler(SpielerDTO spieler) {
        return SpielerMapper.fromEntity(spielerRepository.save(SpielerMapper.toEntity(spieler)));
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
