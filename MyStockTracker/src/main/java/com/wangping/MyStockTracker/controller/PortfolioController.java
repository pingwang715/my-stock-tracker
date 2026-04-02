package com.wangping.MyStockTracker.controller;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;
import com.wangping.MyStockTracker.service.IPortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/portfolios")
@RequiredArgsConstructor
public class PortfolioController {
    private final IPortfolioService iPortfolioService;

    @GetMapping
    public ResponseEntity<List<PortfolioResponseDto>> getPortfolios() {
        List<PortfolioResponseDto> portfolioList = iPortfolioService.getPortfolios();
        return ResponseEntity.ok().body(portfolioList);
    }

    @PostMapping
    public ResponseEntity<String> addPortfolio(@Valid @RequestBody PortfolioRequestDto portfolioRequestDto) {
        iPortfolioService.savePortfolio(portfolioRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Saved portfolio successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        iPortfolioService.deletePortfolio(id);
        return ResponseEntity.ok().build();
    }
}
