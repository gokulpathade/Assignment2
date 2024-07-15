package com.vm.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vm.model.User;
import com.vm.model.repository.UserRepository;



@Service
public class UserService {
	
	
	
	@Autowired
	    private UserRepository userRepository;

	    public List<User> getAllEmployees() {
	        return userRepository.findAll();
	    }

	    public User getEmployeeById(Long id) {
	        return userRepository.findById(id).orElse(null);
	    }

	    public User saveEmployee(User employee) {
	        return userRepository.save(employee);
	    }

	    public User updateEmployee(Long id, User employeeDetails) {
	    	User employee = userRepository.findById(id).orElse(null);

	        if (employee != null) {
	            employee.setName(employeeDetails.getName());
	            employee.setDesignation(employeeDetails.getDesignation());
	            employee.setCtc(employeeDetails.getCtc());
	            employee.setEmail(employeeDetails.getEmail());
	            return userRepository.save(employee);
	        }
	        return null;
	    }

	    public void deleteEmployee(Long id) {
	    	userRepository.deleteById(id);
	    }
}
