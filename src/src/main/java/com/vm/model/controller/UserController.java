package com.vm.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.vm.model.User;
import com.vm.model.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {
	 
	@Autowired
	    private UserService userService;

	    @GetMapping("/getalluser")
	    public List<User> getAllUsers() {
	        return userService.getAllEmployees();
	    }

	    @GetMapping("/getuser/{id}")
	    public ResponseEntity<User> getUserById(@PathVariable Long id) {
	        User User = userService.getEmployeeById(id);
	        return User != null ? ResponseEntity.ok(User) : ResponseEntity.notFound().build();
	    }

	    @PostMapping("/saveuser")
	    public ResponseEntity<User> createUser(@Valid @RequestBody User User) {
	        User savedUser = userService.saveEmployee(User);
	        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	    }

	    @PutMapping("/updateuser/{id}")
	    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User UserDetails) {
	        User updatedUser = userService.updateEmployee(id, UserDetails);
	        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
	    }

	    @DeleteMapping("/deleteuser/{id}")
	    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
	    	userService.deleteEmployee(id);
	        return ResponseEntity.noContent().build();
	    }
}
