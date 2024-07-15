package com.vm.model;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table
public class Email {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
 
	 private String subject;
      private String message;
	 
      
      @Temporal(TemporalType.TIMESTAMP) // Use this for JPA versions < 2.2
      @Column(name = "date_sent")
      private Date dateSent;
	 
	 
	 
	 
	    @ManyToOne
	    @JoinColumn(name = "vendor_id")
	    private Vendor vendor;

	    @ManyToOne
	    @JoinColumn(name = "user_id") // Assuming a User can send the email
	    private User user;

	    private String recipientEmail;

		public Email() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Email(Long id, String subject, String message, Date dateSent, Vendor vendor, User user,
				String recipientEmail) {
			super();
			this.id = id;
			this.subject = subject;
			this.message = message;
			this.dateSent = dateSent;
			this.vendor = vendor;
			this.user = user;
			this.recipientEmail = recipientEmail;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getSubject() {
			return subject;
		}

		public void setSubject(String subject) {
			this.subject = subject;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public Date getDateSent() {
			return dateSent;
		}

		public void setDateSent(Date dateSent) {
			this.dateSent = dateSent;
		}

		public Vendor getVendor() {
			return vendor;
		}

		public void setVendor(Vendor vendor) {
			this.vendor = vendor;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public String getRecipientEmail() {
			return recipientEmail;
		}

		public void setRecipientEmail(String recipientEmail) {
			this.recipientEmail = recipientEmail;
		}

		@Override
		public String toString() {
			return "Email [id=" + id + ", subject=" + subject + ", message=" + message + ", dateSent=" + dateSent
					+ ", vendor=" + vendor + ", user=" + user + ", recipientEmail=" + recipientEmail + "]";
		}

		
		
		
	    
	    
}
