package com.vm.model.service;

import java.util.List;
import com.vm.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage; // Ensure this is imported
import java.util.Date;
import com.vm.dto.EmailDto;
import com.vm.model.User;
import com.vm.model.Vendor;
import com.vm.model.repository.EmailRepository;
import com.vm.model.repository.UserRepository;
import com.vm.model.repository.VendorRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private UserRepository userRepository; // Add UserRepository

    public void sendEmail(List<EmailDto> emailDTOs) {
        for (EmailDto emailDTO : emailDTOs) {
            // Fetch the vendor by ID from the DTO
            Vendor vendor = vendorRepository.findById(emailDTO.getVendor().getId())
                    .orElseThrow(() -> new RuntimeException("Vendor not found"));
            
            // Fetch the user by ID from the DTO
            User user = userRepository.findById(emailDTO.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Prepare the email subject and message
            String subject = "Payment Notification";
            String message = String.format("Sending payments to vendor %s at UPI %s by user %s", 
                    vendor.getName(), vendor.getUpi(), user.getName());

            // Create and send the email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(vendor.getEmail());
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            mailSender.send(mailMessage);
            
            // Save sent email information to the database
            Email email = new Email();
            email.setVendor(vendor);
            email.setUser(user); // Associate user with email
            email.setRecipientEmail(vendor.getEmail());
            email.setDateSent(new Date()); 
            email.setSubject(subject);
            email.setMessage(message);
            emailRepository.save(email);
        }
    }
 
    

    
}