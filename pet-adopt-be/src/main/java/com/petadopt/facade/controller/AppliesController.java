package com.petadopt.facade.controller;

import java.security.Principal;
import java.util.List;

import com.petadopt.facade.model.ApplyRequestModel;
import com.petadopt.service.ApplyRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/applies")
@CrossOrigin("/*")
public class AppliesController {

    private final ApplyRequestService applyRequestService;

    public AppliesController(ApplyRequestService applyRequestService) {
        this.applyRequestService = applyRequestService;
    }

    @GetMapping
    public ResponseEntity<List<ApplyRequestModel>> applyRequestModelList(Principal principal) {
        List<ApplyRequestModel> applyRequests = applyRequestService.getApplyRequests(principal);
        return ResponseEntity.ok(applyRequests);
    }

    @PostMapping(path = "/apply/{petId}")
    public void applyAdoption(@RequestBody ApplyRequestModel applyRequestModel,
                              @PathVariable(name = "petId") Long petId) {
        applyRequestService.applyAdoption(applyRequestModel, petId);
    }

    @PutMapping(path = "/{applyId}/accept")
    public void acceptAdoptApplication(@PathVariable("applyId") Long applyId, Principal principal) {
        applyRequestService.acceptAdoptApplication(applyId, principal);
    }

    @PutMapping(path = "/{applyId}/reject")
    public void rejectAdoptApplication(@PathVariable("applyId") Long applyId, Principal principal) {
        applyRequestService.rejectAdoptApplication(applyId, principal);
    }
}
