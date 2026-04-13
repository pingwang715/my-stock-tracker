package com.wangping.MyStockTracker.security;

import com.wangping.MyStockTracker.entity.Customer;
import com.wangping.MyStockTracker.entity.Role;
import com.wangping.MyStockTracker.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class MyStockTrackerUsernamePwdAuthenticationProvider implements AuthenticationProvider {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String pwd = authentication.getCredentials().toString();

        System.out.println(">>> Attempting login for: " + username);

        Customer customer = customerRepository.findByEmail(username).orElseThrow(
                () -> {
                    System.out.println(">>> USER NOT FOUND: " + username);
                    return new  UsernameNotFoundException("User details not found for the user" + username);
                }
        );
        System.out.println(">>> Found customer, stored hash: " + customer.getPasswordHash());
        boolean matches = passwordEncoder.matches(pwd, customer.getPasswordHash());
        System.out.println(">>> Password matches: " + matches);
        Set<Role> roles = customer.getRoles();
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();
        if (passwordEncoder.matches(pwd, customer.getPasswordHash())) {
            return new UsernamePasswordAuthenticationToken(customer,null, authorities);
        } else {
            throw new BadCredentialsException("Invalid password!");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
