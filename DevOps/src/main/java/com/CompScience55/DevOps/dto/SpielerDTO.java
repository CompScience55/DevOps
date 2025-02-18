package com.CompScience55.DevOps.dto;

import com.CompScience55.DevOps.model.Spieler;

public class SpielerDTO {

    private Long id;
    private String name;
    private Integer geburtsjahr;
    private String stadt;
    private String land;

    public SpielerDTO(Long id, String name, Integer geburtsjahr, String stadt, String land) {
        this.id = id;
        this.name = name;
        this.geburtsjahr = geburtsjahr;
        this.stadt = stadt;
        this.land = land;
    }

    public Long getId() {
        return id;
    }

    public SpielerDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public SpielerDTO setName(String name) {
        this.name = name;
        return this;
    }

    public Integer getGeburtsjahr() {
        return geburtsjahr;
    }

    public SpielerDTO setGeburtsjahr(Integer geburtsjahr) {
        this.geburtsjahr = geburtsjahr;
        return this;
    }

    public String getStadt() {
        return stadt;
    }

    public SpielerDTO setStadt(String stadt) {
        this.stadt = stadt;
        return this;
    }

    public String getLand() {
        return land;
    }

    public SpielerDTO setLand(String land) {
        this.land = land;
        return this;
    }
}
