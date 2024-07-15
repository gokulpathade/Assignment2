package com.vm.model.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vm.dto.EmailDto;
import com.vm.model.Email;
import com.vm.model.repository.EmailRepository;
import com.vm.model.service.EmailService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailRepository emailRepository;
    
    @PostMapping("/send")
    public void sendEmailToVendors(@RequestBody List<EmailDto> emailDTOs) {
        emailService.sendEmail(emailDTOs);
    }
    
    @GetMapping("/allemail")
    public ResponseEntity<List<Email>> getAllEmails() {
        List<Email> emails = emailRepository.findAll();
        return ResponseEntity.ok(emails);
    }
    
    
    @GetMapping("/getemail/{id}")
    public ResponseEntity<Email> getEmailById(@PathVariable Long id) {
        Optional<Email> email = emailRepository.findById(id);
        if (email.isPresent()) {
            return ResponseEntity.ok(email.get());
        } else {
            return ResponseEntity.notFound().build(); // Returns 404 if not found
        }
    }
}