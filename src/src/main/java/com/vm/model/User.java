package com.vm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
public class User {
	
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank(message = "Name is mandatory")
	    private String name;

	    @NotBlank(message = "Designation is mandatory")
	    private String designation;

	    @Min(value = 0, message = "CTC must be positive")
	    private Double ctc;

	    @Email(message = "Email should be valid")
	    private String email;

	    
		public User() {
			super();
			// TODO Auto-generated constructor stub
		}

		public User(Long id, @NotBlank(message = "Name is required") String name,
				@NotBlank(message = "Designation is required") String designation,
				@NotNull(message = "CTC is required") @Positive(message = "CTC must be positive") Double ctc,
				@NotBlank(message = "Email is required") @Email(message = "Email should be valid") String email) {
			super();
			this.id = id;
			this.name = name;
			this.designation = designation;
			this.ctc = ctc;
			this.email = email;
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

		public String getDesignation() {
			return designation;
		}

		public void setDesignation(String designation) {
			this.designation = designation;
		}

		public Double getCtc() {
			return ctc;
		}

		public void setCtc(Double ctc) {
			this.ctc = ctc;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

	
		
		@Override
		public String toString() {
			return "User [id=" + id + ", name=" + name + ", designation=" + designation + ", ctc=" + ctc + ", email="
					+ email + "]";
		}
	    
	    
	    
	    

}
