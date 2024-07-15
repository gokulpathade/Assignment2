package com.vm.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vm.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
}