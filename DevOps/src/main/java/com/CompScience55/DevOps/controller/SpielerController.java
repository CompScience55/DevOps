package com.CompScience55.DevOps.controller;

import com.CompScience55.DevOps.dto.SpielerDTO;
import com.CompScience55.DevOps.service.SpielerService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/spieler")
public class SpielerController {

    private final SpielerService spielerService;

    public SpielerController(SpielerService spielerService) {
        this.spielerService = spielerService;
    }

    // Alle Spieler abrufen und als CollectionModel zurückliefern
    @GetMapping("/getAll")
    public ResponseEntity<CollectionModel<EntityModel<SpielerDTO>>> getAllSpieler() {
        List<EntityModel<SpielerDTO>> spielerList = spielerService.getAllSpieler().stream()
                .map(spieler -> EntityModel.of(spieler,
                        linkTo(methodOn(SpielerController.class).getSpielerById(spieler.getId())).withSelfRel()))
                .collect(Collectors.toList());

        CollectionModel<EntityModel<SpielerDTO>> collectionModel = CollectionModel.of(
                spielerList,
                linkTo(methodOn(SpielerController.class).getAllSpieler()).withSelfRel()
        );
        return ResponseEntity.ok(collectionModel);
    }

    // Spieler anhand der ID abrufen und mit Links zurückliefern
    @GetMapping("/get/{id}")
    public ResponseEntity<EntityModel<SpielerDTO>> getSpielerById(@PathVariable Long id) {
        SpielerDTO spieler = spielerService.getSpielerById(id);
        EntityModel<SpielerDTO> entityModel = EntityModel.of(
                spieler,
                linkTo(methodOn(SpielerController.class).getSpielerById(id)).withSelfRel(),
                linkTo(methodOn(SpielerController.class).getAllSpieler()).withRel("alleSpieler")
        );
        return ResponseEntity.ok(entityModel);
    }

    // Neuen Spieler erstellen und Hypermedia-Link hinzufügen
    @PostMapping("/create")
    public ResponseEntity<EntityModel<SpielerDTO>> createSpieler(@RequestBody SpielerDTO spieler) {
        SpielerDTO createdSpieler = spielerService.createSpieler(spieler);
        EntityModel<SpielerDTO> entityModel = EntityModel.of(
                createdSpieler,
                linkTo(methodOn(SpielerController.class).getSpielerById(createdSpieler.getId())).withSelfRel()
        );
        return ResponseEntity
                .created(linkTo(methodOn(SpielerController.class).getSpielerById(createdSpieler.getId())).toUri())
                .body(entityModel);
    }

    // Spieler aktualisieren und aktualisiertes Objekt mit Links zurückliefern
    @PutMapping("/update/{id}")
    public ResponseEntity<EntityModel<SpielerDTO>> updateSpieler(@PathVariable Long id, @RequestBody SpielerDTO spieler) {
        SpielerDTO updatedSpieler = spielerService.updateSpieler(id, spieler);
        EntityModel<SpielerDTO> entityModel = EntityModel.of(
                updatedSpieler,
                linkTo(methodOn(SpielerController.class).getSpielerById(updatedSpieler.getId())).withSelfRel()
        );
        return ResponseEntity.ok(entityModel);
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
