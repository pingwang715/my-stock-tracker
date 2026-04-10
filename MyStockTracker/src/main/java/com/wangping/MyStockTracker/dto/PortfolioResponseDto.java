package com.wangping.MyStockTracker.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PortfolioResponseDto {
    private Long portfolioId;
    private String symbol;
    private Integer shares;
    private BigDecimal purchasePrice;
    private LocalDate purchaseDate;
}
