package com.CompScience55.DevOps.model;

import jakarta.persistence.*;

@Entity
@Table(name = "spieler")
public class Spieler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer geburtsjahr;
    private String stadt;
    private String land;

    // Standard-Konstruktor
    public Spieler() {
    }

    // Optional: Konstruktor mit Feldern (ohne ID, da diese auto-generiert wird)
    public Spieler(String name, Integer geburtsjahr, String stadt, String land) {
        this.name = name;
        this.geburtsjahr = geburtsjahr;
        this.stadt = stadt;
        this.land = land;
    }

    public Long getId() {
        return id;
    }

    public Spieler setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Spieler setName(String name) {
        this.name = name;
        return this;
    }

    public Integer getGeburtsjahr() {
        return geburtsjahr;
    }

    public Spieler setGeburtsjahr(Integer geburtsjahr) {
        this.geburtsjahr = geburtsjahr;
        return this;
    }

    public String getStadt() {
        return stadt;
    }

    public Spieler setStadt(String stadt) {
        this.stadt = stadt;
        return this;
    }

    public String getLand() {
        return land;
    }

    public Spieler setLand(String land) {
        this.land = land;
        return this;
    }
}
