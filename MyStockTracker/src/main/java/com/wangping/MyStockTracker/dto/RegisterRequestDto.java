package com.wangping.MyStockTracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 30, message = "The length of the same should be between 3 and 30 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email address must be a valid value")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4, max = 20, message = "Password length must be between 4 and 20 characters")
    private String password;
}
