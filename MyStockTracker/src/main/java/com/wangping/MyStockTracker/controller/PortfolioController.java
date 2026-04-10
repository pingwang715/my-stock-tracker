package com.wangping.MyStockTracker.controller;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;
import com.wangping.MyStockTracker.entity.Customer;
import com.wangping.MyStockTracker.repository.CustomerRepository;
import com.wangping.MyStockTracker.service.IPortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/portfolios")
@RequiredArgsConstructor
public class PortfolioController {
    private final IPortfolioService iPortfolioService;
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<PortfolioResponseDto>> getPortfolios(Authentication authentication) {
        String username = (String) authentication.getPrincipal();
        Customer customer = customerRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Customer not found: "  + username));
        List<PortfolioResponseDto> portfolioList = iPortfolioService.getPortfolios(customer);
        return ResponseEntity.ok().body(portfolioList);
    }

    @PostMapping
    public ResponseEntity<String> addPortfolio(@Valid @RequestBody PortfolioRequestDto portfolioRequestDto, Authentication authentication) {
        String username = (String) authentication.getPrincipal();

        Customer customer = customerRepository.findByEmail(username)
                        .orElseThrow(() -> new RuntimeException("Customer not found: "  + username));
        iPortfolioService.savePortfolio(portfolioRequestDto, customer);
        return ResponseEntity.status(HttpStatus.CREATED).body("Saved portfolio successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id, Authentication authentication) {
        String username = (String) authentication.getPrincipal();

        Customer customer = customerRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Customer not found: "  + username));
        iPortfolioService.deletePortfolio(id, customer);
        return ResponseEntity.ok().build();
    }
}
