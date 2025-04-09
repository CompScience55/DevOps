package com.CompScience55.DevOps.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.CompScience55.DevOps.dto.SpielerDTO;
import com.CompScience55.DevOps.service.SpielerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SpielerController.class)
@Import(SpielerControllerTest.TestConfig.class)
public class SpielerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpielerService spielerService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public SpielerService spielerService() {
            return Mockito.mock(SpielerService.class);
        }
    }

    @Test
    @DisplayName("GET /api/spieler/get/1 – sollte Spieler mit HATEOAS-Links zurückliefern")
    public void testGetSpielerById() throws Exception {
        SpielerDTO spieler = new SpielerDTO();
        spieler.setId(1L);
        spieler.setName("TestSpieler");

        given(spielerService.getSpielerById(1L)).willReturn(spieler);

        mockMvc.perform(get("/api/spieler/get/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._links.self.href").value("http://localhost/api/spieler/get/1"))
                .andExpect(jsonPath("$._links.alleSpieler.href").value("http://localhost/api/spieler/getAll"));
    }

    @Test
    @DisplayName("GET /api/spieler/getAll – sollte alle Spieler samt Self-Link zurückliefern")
    public void testGetAllSpieler() throws Exception {
        SpielerDTO spieler1 = new SpielerDTO();
        spieler1.setId(1L);
        spieler1.setName("Spieler1");

        SpielerDTO spieler2 = new SpielerDTO();
        spieler2.setId(2L);
        spieler2.setName("Spieler2");

        given(spielerService.getAllSpieler()).willReturn(Arrays.asList(spieler1, spieler2));

        mockMvc.perform(get("/api/spieler/getAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._links.self.href").value("http://localhost/api/spieler/getAll"))
                .andExpect(jsonPath("$._embedded.*[0]._links.self.href").value("http://localhost/api/spieler/get/1"))
                .andExpect(jsonPath("$._embedded.*[1]._links.self.href").value("http://localhost/api/spieler/get/2"));
    }

    @Test
    @DisplayName("GET /api/spieler/getAll – sollte leere Liste mit Self-Link zurückliefern, wenn keine Spieler existieren")
    public void testGetAllSpielerEmpty() throws Exception {
        given(spielerService.getAllSpieler()).willReturn(Collections.emptyList());

        mockMvc.perform(get("/api/spieler/getAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._links.self.href").value("http://localhost/api/spieler/getAll"))
                .andExpect(jsonPath("$._embedded").doesNotExist());
    }

    @Test
    @DisplayName("POST /api/spieler/create – sollte Spieler erstellen und den self-Link zurückliefern")
    public void testCreateSpieler() throws Exception {
        SpielerDTO spielerToCreate = new SpielerDTO();
        spielerToCreate.setName("NeuerSpieler");

        SpielerDTO createdSpieler = new SpielerDTO();
        createdSpieler.setId(100L);
        createdSpieler.setName("NeuerSpieler");


        given(spielerService.createSpieler(any(SpielerDTO.class))).willReturn(createdSpieler);

        mockMvc.perform(post("/api/spieler/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(spielerToCreate)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "http://localhost/api/spieler/get/100"))
                .andExpect(jsonPath("$._links.self.href").value("http://localhost/api/spieler/get/100"));
    }

    @Test
    @DisplayName("PUT /api/spieler/update/1 – sollte Spieler aktualisieren und HATEOAS-Links zurückliefern")
    public void testUpdateSpieler() throws Exception {
        SpielerDTO inputSpieler = new SpielerDTO();
        inputSpieler.setName("UpdatedSpieler");

        SpielerDTO updatedSpieler = new SpielerDTO();
        updatedSpieler.setId(1L);
        updatedSpieler.setName("UpdatedSpieler");

        given(spielerService.updateSpieler(eq(1L), any(SpielerDTO.class))).willReturn(updatedSpieler);

        mockMvc.perform(put("/api/spieler/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputSpieler)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._links.self.href").value("http://localhost/api/spieler/get/1"));
    }

    @Test
    @DisplayName("DELETE /api/spieler/delete/1 – sollte Spieler erfolgreich löschen")
    public void testDeleteSpieler() throws Exception {
        given(spielerService.deleteSpieler(1L)).willReturn(true);

        mockMvc.perform(delete("/api/spieler/delete/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("DELETE /api/spieler/delete/999 – sollte 404 zurückliefern, wenn Spieler nicht gefunden wird")
    public void testDeleteSpielerNotFound() throws Exception {
        given(spielerService.deleteSpieler(999L)).willReturn(false);

        mockMvc.perform(delete("/api/spieler/delete/999"))
                .andExpect(status().isNotFound());
    }
}
