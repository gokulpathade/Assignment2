package com.vm.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.vm.model.Vendor;
import com.vm.model.service.VendorService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class VendorController {
	   @Autowired
	    private VendorService vendorService;

	   
	   
	   
	    @GetMapping("/getallvender")
	    public List<Vendor> getAllVendors() {
	        return vendorService.getAllVendors();
	    }

	    @GetMapping("/getvender/{id}")
	    public ResponseEntity<Vendor> getVendorById(@PathVariable("id") Long id) {
	        return vendorService.getVendorById(id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }

	    @PostMapping("/savevendor")
//	    @ResponseStatus(HttpStatus.CREATED)
	    public Vendor createVendor(@Valid @RequestBody Vendor vendor) {
	        return vendorService.createVendor(vendor);
	    }

	    @PutMapping("/updatevender/{id}")
	    public ResponseEntity<Vendor> updateVendor(@PathVariable("id") Long id, @Valid @RequestBody Vendor updatedVendor) {
	        Vendor vendor = vendorService.updateVendor(id, updatedVendor);
	        return vendor != null ? ResponseEntity.ok(vendor) : ResponseEntity.notFound().build();
	    }

	    @DeleteMapping("/deletevender/{id}")
//	    @ResponseStatus(HttpStatus.NO_CONTENT)
	    public void deleteVendor(@PathVariable("id") Long id) {
	        vendorService.deleteVendor(id);
	    }
}