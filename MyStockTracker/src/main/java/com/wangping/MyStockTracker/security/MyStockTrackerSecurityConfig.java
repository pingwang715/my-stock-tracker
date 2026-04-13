package com.wangping.MyStockTracker.security;

import com.wangping.MyStockTracker.filter.JWTTokenValidatorFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MyStockTrackerSecurityConfig {

    private final List<String> publicPaths;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http)
            throws Exception {
        return http.csrf(csrfConfig -> csrfConfig.disable())
                .cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource())
                        )
                .authorizeHttpRequests((requests) -> {
                            publicPaths.forEach(path ->
                                    requests.requestMatchers(path).permitAll());
                            requests.requestMatchers("/api/v1/admin/**").hasRole("ADMIN");
                            requests.anyRequest().hasAnyRole("USER", "ADMIN");
                        }
                )
                .addFilterBefore(new JWTTokenValidatorFilter(publicPaths), BasicAuthenticationFilter.class)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(withDefaults())
                .httpBasic(withDefaults()).build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider) throws AuthenticationException {
        var provideManager = new ProviderManager(authenticationProvider);
        return provideManager;
    }

//    @Bean
//    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
//            PasswordEncoder passwordEncoder) {
//        var daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService);
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
//        var providerManager = new ProviderManager(daoAuthenticationProvider);
//        return providerManager;
//    }



//    @Bean
//    public UserDetailsService userDetailsService(CustomerRepository customerRepository) {
//        return username -> customerRepository.findByEmail(username)
//                .map(customer -> org.springframework.security.core.userdetails.User
//                        .withUsername(customer.getEmail())
//                        .password(customer.getPasswordHash())
//                        .roles("USER")
//                        .build())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
//    }

//    @Bean
//    public AuthenticationProvider authenticationProvider(
//            UserDetailsService userDetailsService,
//            PasswordEncoder passwordEncoder) {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(userDetailsService);
//        provider.setPasswordEncoder(passwordEncoder);
//        return provider;
//    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CompromisedPasswordChecker compromisedPasswordChecker() {
        return new HaveIBeenPwnedRestApiPasswordChecker();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
