package com.vm.model.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vm.model.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
}
