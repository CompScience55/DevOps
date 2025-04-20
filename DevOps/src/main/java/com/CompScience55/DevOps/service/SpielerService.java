package com.CompScience55.DevOps.service;

import com.CompScience55.DevOps.dto.SpielerDTO;
import com.CompScience55.DevOps.dto.SpielerMapper;
import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.repository.SpielerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpielerService {

    private final SpielerRepository spielerRepository;

    public SpielerService(SpielerRepository spielerRepository) {
        this.spielerRepository = spielerRepository;
    }

    /**
     * Ruft alle Spieler aus dem Repository ab und liefert sie als Liste von DTOs zurück.
     *
     * @return Liste aller Spieler als SpielerDTO
     */
    public List<SpielerDTO> getAllSpieler() {
        return spielerRepository.findAll().stream().map(SpielerMapper::fromEntity).collect(Collectors.toList());
    }

    /**
     * Ruft einen einzelnen Spieler anhand der übergebenen ID ab.
     *
     * @param id die ID des gesuchten Spielers
     * @return Das gefundene SpielerDTO
     */
    @Transactional(readOnly = true)
    public SpielerDTO getSpielerById(Long id) {
        return SpielerMapper.fromEntity(spielerRepository.getReferenceById(id));
    }

    /**
     * Aktualisiert die Daten eines bestehenden Spielers und speichert die Änderungen.
     *
     * @param id               die ID des zu aktualisierenden Spielers
     * @param updatedSpieler   DTO mit den neuen Daten für den Spieler
     * @return Das aktualisierte SpielerDTO
     */
    @Transactional
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


    /**
     * Erstellt einen neuen Spieler basierend auf den übergebenen Daten und speichert ihn im Repository.
     *
     * @param spieler DTO mit den Daten des neuen Spielers
     * @return Das neu erstellte SpielerDTO
     */
    public SpielerDTO createSpieler(SpielerDTO spieler) {
        return SpielerMapper.fromEntity(spielerRepository.save(SpielerMapper.toEntity(spieler)));
    }

    /**
     * Löscht einen Spieler anhand seiner ID, falls er existiert.
     *
     * @param id die ID des zu löschenden Spielers
     * @return true, wenn der Spieler gefunden und gelöscht wurde, sonst false
     */
    public boolean deleteSpieler(Long id) {
        return spielerRepository.findById(id)
                .map(spieler -> {
                    spielerRepository.delete(spieler);
                    return true;
                })
                .orElse(false);
    }
}
