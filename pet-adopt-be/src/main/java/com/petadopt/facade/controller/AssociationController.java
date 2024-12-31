package com.petadopt.facade.controller;

import java.security.Principal;
import java.util.List;

import com.petadopt.facade.model.AddAssociationRequest;
import com.petadopt.facade.model.AssociationResponse;
import com.petadopt.service.AssociationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/association")
public class AssociationController {

    private final AssociationService associationService;

    public AssociationController(AssociationService associationService) {
        this.associationService = associationService;
    }

    @PostMapping("/add")
    public void addAssociation(@RequestBody AddAssociationRequest addAssociationRequest, Principal principal) {
        associationService.addAssociation(addAssociationRequest, principal);
    }


    @GetMapping(path = "/currentUser")
    public ResponseEntity<List<AssociationResponse>> getUserAssociations(Principal principal) {
        List<AssociationResponse> associations = associationService.getAssociation(principal);
        return ResponseEntity.ok(associations);
    }

    @GetMapping
    public ResponseEntity<List<AssociationResponse>> getAssociations() {
        List<AssociationResponse> associations = associationService.getAssociations();
        return ResponseEntity.ok(associations);
    }

    @DeleteMapping("/{id}")
    public void deleteAssociation(@PathVariable("id") Long id, Principal principal) {
        associationService.deleteAssociation(id, principal.getName());
    }
}
