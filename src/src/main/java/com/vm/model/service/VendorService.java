package com.vm.model.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vm.model.Vendor;
import com.vm.model.repository.VendorRepository;

@Service
public class VendorService {

	
	
	
	
	 @Autowired
	    private VendorRepository vendorRepository;

	    
	    public List<Vendor> getAllVendors() {
	        return vendorRepository.findAll();
	    }

	    
	    public Optional<Vendor> getVendorById(Long id) {
	        return vendorRepository.findById(id);
	    }

	    
	    public Vendor createVendor(Vendor vendor) {
	        return vendorRepository.save(vendor);
	    }

	    
	    public Vendor updateVendor(Long id, Vendor updatedVendor) {
	        Optional<Vendor> vendor = vendorRepository.findById(id);
	        if (vendor.isPresent()) {
	            Vendor existingVendor = vendor.get();
	            existingVendor.setName(updatedVendor.getName());
	            existingVendor.setEmail(updatedVendor.getEmail());
	            existingVendor.setUpi(updatedVendor.getUpi());
	            return vendorRepository.save(existingVendor);
	        }
	        return null; // Or handle differently if vendor not found
	    }

	    
	    public void deleteVendor(Long id) {
	        vendorRepository.deleteById(id);
	    }
	    
	    
	    
}
