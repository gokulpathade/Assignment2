package com.vm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table
public class Vendor {
	 
	
	
	
	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotEmpty(message = "Name is required")
	    private String name;

	    @Email(message = "Email should be valid")
	    @NotEmpty(message = "Email is required")
	    private String email;

	    @NotEmpty(message = "UPI is required")
	    private String upi;
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    public Vendor() {
			super();
			// TODO Auto-generated constructor stub
		}










		public Vendor(Long id, @NotEmpty(message = "Name is required") String name,
				@Email(message = "Email should be valid") @NotEmpty(message = "Email is required") String email,
				@NotEmpty(message = "UPI is required") String upi) {
			super();
			this.id = id;
			this.name = name;
			this.email = email;
			this.upi = upi;
		}










		public Long getId() {
			return id;
		}










		public void setId(Long id) {
			this.id = id;
		}










		public String getName() {
			return name;
		}










		public void setName(String name) {
			this.name = name;
		}










		public String getEmail() {
			return email;
		}










		public void setEmail(String email) {
			this.email = email;
		}










		public String getUpi() {
			return upi;
		}










		public void setUpi(String upi) {
			this.upi = upi;
		}










		@Override
		public String toString() {
			return "Vendor [id=" + id + ", name=" + name + ", email=" + email + ", upi=" + upi + "]";
		}

















		
		
		
	    
	    
	    
}
