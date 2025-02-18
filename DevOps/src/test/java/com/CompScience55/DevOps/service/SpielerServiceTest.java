package com.CompScience55.DevOps.service;

import com.CompScience55.DevOps.model.Spieler;
import com.CompScience55.DevOps.repository.SpielerRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class SpielerServiceTest {

    private static final String NAME = "Hannes";
    private static final int GEB_JAHR = 2003;
    private static final String STADT = "Jena";
    private static final String LAND = "DE";
    private static final Spieler SPIELER = new Spieler(NAME, GEB_JAHR, STADT, LAND);

    @Autowired
    private SpielerService spielerService;

    @Autowired
    private SpielerRepository spielerRepository;

    @BeforeEach
    void setUp() {
        spielerRepository.save(SPIELER);
    }

    @Test
    void testGetAllSpieler() {
        //given

        //when
        List<Spieler> result = spielerService.getAllSpieler();

        //then
        assertThat(isEqual(result.get(0), SPIELER)).isTrue();
    }

    @Test
    void testGetSpielerByID() {
        //given

        //when
        Optional<Spieler> result = spielerService.getSpielerById(SPIELER.getId());

        //then
        assertThat(result.isEmpty()).isFalse();
        assertThat(isEqual(result.get(), SPIELER)).isTrue();
    }

    private boolean isEqual(Spieler spieler1, Spieler spieler2) {
        return spieler1.getName().equals(spieler2.getName())
                && spieler1.getGeburtsjahr().equals(spieler2.getGeburtsjahr())
                && spieler1.getLand().equals(spieler2.getLand())
                && spieler1.getStadt().equals(spieler2.getStadt());
    }
}
