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

    /**
     * Ruft alle Spieler ab und liefert sie als HATEOAS CollectionModel zurück.
     *
     * @return ResponseEntity mit CollectionModel aller Spieler
     */
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

    /**
     * Ruft einen einzelnen Spieler anhand der übergebenen ID ab und liefert ihn als HATEOAS EntityModel zurück.
     *
     * @param id die ID des gesuchten Spielers
     * @return ResponseEntity mit EntityModel des gefundenen Spielers
     */
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

    /**
     * Erstellt einen neuen Spieler und fügt einen Self-Link zum erstellten Spieler hinzu.
     *
     * @param spieler das DTO mit den Daten des neuen Spielers
     * @return ResponseEntity mit EntityModel des neu erstellten Spielers
     */
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

    /**
     * Aktualisiert einen bestehenden Spieler mit den übergebenen Daten und liefert das aktualisierte Objekt zurück.
     *
     * @param id      die ID des zu aktualisierenden Spielers
     * @param spieler das DTO mit den neuen Daten für den Spieler
     * @return ResponseEntity mit EntityModel des aktualisierten Spielers
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<EntityModel<SpielerDTO>> updateSpieler(@PathVariable Long id, @RequestBody SpielerDTO spieler) {
        SpielerDTO updatedSpieler = spielerService.updateSpieler(id, spieler);
        EntityModel<SpielerDTO> entityModel = EntityModel.of(
                updatedSpieler,
                linkTo(methodOn(SpielerController.class).getSpielerById(updatedSpieler.getId())).withSelfRel()
        );
        return ResponseEntity.ok(entityModel);
    }

    /**
     * Löscht einen Spieler anhand seiner ID.
     *
     * @param id die ID des zu löschenden Spielers
     * @return ResponseEntity ohne Inhalt bei erfolgreichem Löschen oder 404, wenn nicht gefunden
     */
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
