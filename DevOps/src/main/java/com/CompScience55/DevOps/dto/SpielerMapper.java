package com.CompScience55.DevOps.dto;

import com.CompScience55.DevOps.model.Spieler;

public class SpielerMapper {

    public static Spieler toEntity(SpielerDTO spielerDTO) {
        return new Spieler(spielerDTO.getName(), spielerDTO.getGeburtsjahr(), spielerDTO.getStadt(), spielerDTO.getLand());
    }

    public static SpielerDTO fromEntity(Spieler spieler) {
        return new SpielerDTO(spieler.getId(), spieler.getName(), spieler.getGeburtsjahr(), spieler.getStadt(), spieler.getLand());
    }
}
