package com.vm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor

public class EmailDto {
	 
	private Long id;
	    private VendorDto vendor;
	    private UserDto user; // New field
	    private String recipientEmail;
	    
	    
	    
	    
		public EmailDto() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		
		
		
		
		
		public EmailDto(Long id, VendorDto vendor, UserDto user, String recipientEmail) {
			super();
			this.id = id;
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
		public VendorDto getVendor() {
			return vendor;
		}
		public void setVendor(VendorDto vendor) {
			this.vendor = vendor;
		}
		public UserDto getUser() {
			return user;
		}
		public void setUser(UserDto user) {
			this.user = user;
		}
		public String getRecipientEmail() {
			return recipientEmail;
		}
		public void setRecipientEmail(String recipientEmail) {
			this.recipientEmail = recipientEmail;
		}
	    
	    
	    
}
