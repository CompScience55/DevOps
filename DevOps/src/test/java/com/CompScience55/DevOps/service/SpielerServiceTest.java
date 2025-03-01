package com.CompScience55.DevOps.service;

import com.CompScience55.DevOps.dto.SpielerDTO;
import com.CompScience55.DevOps.dto.SpielerMapper;
import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.repository.SpielerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class SpielerServiceTest {

    @Autowired
    private SpielerRepository spielerRepository;

    @Autowired
    private SpielerService spielerService;

    private Spieler spielerEntity;

    @BeforeEach
    void setUp() {
        // Leere die Datenbank vor jedem Test, damit die Tests voneinander unabhängig sind
        spielerRepository.deleteAll();

        // Beispiel-Daten für die Tests
        spielerEntity = new Spieler();
        spielerEntity.setName("Hannes");
        spielerEntity.setGeburtsjahr(2004);
        spielerEntity.setStadt("Berlin");
        spielerEntity.setLand("Deutschland");

        // In DB speichern
        spielerEntity = spielerRepository.save(spielerEntity);
    }

    @Test
    void testGetAllSpieler() {
        // WHEN
        List<SpielerDTO> result = spielerService.getAllSpieler();

        // THEN
        assertEquals(1, result.size());
        assertEquals("Hannes", result.get(0).getName());
    }

    @Test
    void testGetSpielerById() {
        // WHEN
        SpielerDTO result = spielerService.getSpielerById(spielerEntity.getId());

        // THEN
        assertNotNull(result);
        assertEquals("Hannes", result.getName());
        assertEquals(2004, result.getGeburtsjahr());
    }

    @Test
    void testCreateSpieler() {
        // GIVEN
        SpielerDTO dto = new SpielerDTO();
        dto.setName("Neuer Spieler");
        dto.setGeburtsjahr(1990);
        dto.setStadt("Leipzig");
        dto.setLand("Deutschland");

        // WHEN
        SpielerDTO created = spielerService.createSpieler(dto);

        // THEN
        assertNotNull(created.getId(), "Erstellter Spieler sollte eine ID haben");
        assertEquals("Neuer Spieler", created.getName());

        // Datenbank erneut abfragen
        List<SpielerDTO> allSpieler = spielerService.getAllSpieler();
        assertEquals(2, allSpieler.size(), "Nun sollten 2 Spieler in der DB sein");
    }

    @Test
    void testUpdateSpieler() {
        // GIVEN
        SpielerDTO updatedDTO = new SpielerDTO();
        updatedDTO.setName("Hans");
        updatedDTO.setGeburtsjahr(2000);
        updatedDTO.setStadt("Hamburg");
        updatedDTO.setLand("Deutschland");

        // WHEN
        SpielerDTO result = spielerService.updateSpieler(spielerEntity.getId(), updatedDTO);

        // THEN
        assertEquals("Hans", result.getName());
        assertEquals(2000, result.getGeburtsjahr());
        assertEquals("Hamburg", result.getStadt());
        assertEquals("Deutschland", result.getLand());

        // Nochmal direkt aus DB holen und prüfen
        Spieler updatedEntity = spielerRepository.findById(spielerEntity.getId()).orElseThrow();
        assertEquals("Hans", updatedEntity.getName());
    }

    @Test
    void testDeleteSpielerFound() {
        // WHEN
        boolean deleted = spielerService.deleteSpieler(spielerEntity.getId());

        // THEN
        assertTrue(deleted, "Spieler sollte erfolgreich gelöscht werden");
        assertFalse(spielerRepository.findById(spielerEntity.getId()).isPresent(),
                "Spieler sollte nicht mehr in der DB sein");
    }

    @Test
    void testDeleteSpielerNotFound() {
        // GIVEN
        long nonExistingId = 9999L;

        // WHEN
        boolean deleted = spielerService.deleteSpieler(nonExistingId);

        // THEN
        assertFalse(deleted, "Löschvorgang sollte fehlschlagen, wenn ID nicht existiert");
    }
}
