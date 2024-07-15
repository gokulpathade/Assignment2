package com.vm.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vm.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
