package com.wangping.MyStockTracker.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PublicPathConfig {

    @Bean
    public List<String> publicPaths(){
        return List.of(
                "/api/v1/stocks/**",
                "/api/v1/auth/**",
                "/api/v1/csrf-token",
                "/error"
        );
    }
}
